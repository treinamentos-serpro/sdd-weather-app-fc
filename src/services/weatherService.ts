import type { City, CurrentWeather, ForecastDay, WeatherData } from '../types/weather';

export class WeatherServiceError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number, cause?: unknown) {
    super(message, { cause });
    this.name = 'WeatherServiceError';
    this.status = status;
  }
}

const REQUEST_TIMEOUT_MS = 10_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { signal: controller.signal });
  } catch (cause) {
    if (isRecord(cause) && cause.name === 'AbortError') {
      throw new WeatherServiceError('A requisição demorou demais.', undefined, cause);
    }

    throw new WeatherServiceError('Falha de rede.', undefined, cause);
  } finally {
    clearTimeout(timeoutId);
  }
}

function mapCity(value: unknown): City {
  if (
    !isRecord(value) ||
    typeof value.id !== 'number' ||
    typeof value.name !== 'string' ||
    typeof value.latitude !== 'number' ||
    typeof value.longitude !== 'number'
  ) {
    throw new WeatherServiceError('A resposta de geocodificação é inválida.');
  }

  return {
    id: value.id,
    name: value.name,
    latitude: value.latitude,
    longitude: value.longitude,
    ...(typeof value.country === 'string' ? { country: value.country } : {}),
    ...(typeof value.country_code === 'string' ? { countryCode: value.country_code } : {}),
    ...(typeof value.admin1 === 'string' ? { region: value.admin1 } : {}),
    ...(typeof value.timezone === 'string' ? { timeZone: value.timezone } : {}),
  };
}

function nullableNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function mapCurrentWeather(value: Record<string, unknown>): CurrentWeather {
  const isDay = value.is_day === 1 ? true : value.is_day === 0 ? false : null;

  return {
    observedAt: typeof value.time === 'string' ? value.time : undefined,
    temperatureC: nullableNumber(value.temperature_2m),
    apparentTemperatureC: nullableNumber(value.apparent_temperature),
    relativeHumidityPercent: nullableNumber(value.relative_humidity_2m),
    weatherCode: nullableNumber(value.weather_code),
    precipitationMm: nullableNumber(value.precipitation),
    cloudCoverPercent: nullableNumber(value.cloud_cover),
    pressureMslHpa: nullableNumber(value.pressure_msl),
    windSpeedKmh: nullableNumber(value.wind_speed_10m),
    windDirectionDegrees: nullableNumber(value.wind_direction_10m),
    isDay,
  };
}

const dailyArrayFields = [
  'weather_code',
  'temperature_2m_min',
  'temperature_2m_max',
  'precipitation_probability_max',
  'precipitation_sum',
  'wind_speed_10m_max',
  'wind_direction_10m_dominant',
] as const;

function mapForecast(daily: Record<string, unknown>): ForecastDay[] {
  if (
    !Array.isArray(daily.time) ||
    daily.time.length !== 5 ||
    !daily.time.every((date) => typeof date === 'string')
  ) {
    throw new WeatherServiceError(
      'A resposta de previsão está incompleta: eram esperados cinco dias.',
    );
  }

  for (const field of dailyArrayFields) {
    const values = daily[field];
    if (values != null && (!Array.isArray(values) || values.length !== daily.time.length)) {
      throw new WeatherServiceError(`A resposta de previsão contém uma lista inválida: ${field}.`);
    }
  }

  return daily.time.map((localDate, index) => ({
    localDate,
    weatherCode: dailyNumber(daily, 'weather_code', index),
    temperatureMinC: dailyNumber(daily, 'temperature_2m_min', index),
    temperatureMaxC: dailyNumber(daily, 'temperature_2m_max', index),
    precipitationProbabilityMaxPercent: dailyNumber(daily, 'precipitation_probability_max', index),
    precipitationSumMm: dailyNumber(daily, 'precipitation_sum', index),
    windSpeedMaxKmh: dailyNumber(daily, 'wind_speed_10m_max', index),
    windDirectionDominantDegrees: dailyNumber(daily, 'wind_direction_10m_dominant', index),
  }));
}

function dailyNumber(
  daily: Record<string, unknown>,
  field: (typeof dailyArrayFields)[number],
  index: number,
): number | null {
  const values = daily[field];
  return Array.isArray(values) ? nullableNumber(values[index]) : null;
}

export async function searchCities(name: string): Promise<City[]> {
  const query = name.trim();
  if (query.length === 0) return [];

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}` +
    '&count=10&language=pt&format=json';

  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new WeatherServiceError('Não foi possível buscar cidades no momento.', response.status);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new WeatherServiceError(
      'O serviço de busca retornou uma resposta inválida.',
      undefined,
      cause,
    );
  }

  if (!isRecord(payload)) {
    throw new WeatherServiceError('O serviço de busca retornou uma resposta inválida.');
  }

  if (payload.results == null) return [];
  if (!Array.isArray(payload.results)) {
    throw new WeatherServiceError('O serviço de busca retornou resultados inválidos.');
  }

  return payload.results.map(mapCity);
}

export async function getWeather(city: City): Promise<WeatherData> {
  const parameters = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,is_day',
    daily:
      'weather_code,temperature_2m_min,temperature_2m_max,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant',
    timezone: city.timeZone ?? 'auto',
    forecast_days: '5',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
  });
  const url = `https://api.open-meteo.com/v1/forecast?${parameters.toString()}`;

  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new WeatherServiceError(
      'Não foi possível carregar a previsão no momento.',
      response.status,
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new WeatherServiceError(
      'O serviço de previsão retornou uma resposta inválida.',
      undefined,
      cause,
    );
  }

  if (!isRecord(payload) || !isRecord(payload.current) || !isRecord(payload.daily)) {
    throw new WeatherServiceError(
      'A resposta de previsão está incompleta: current ou daily ausente.',
    );
  }

  return {
    city,
    current: mapCurrentWeather(payload.current),
    forecast: mapForecast(payload.daily),
    fetchedAt: new Date().toISOString(),
  };
}
