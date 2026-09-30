import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getWeather, searchCities, WeatherServiceError } from '../../src/services/weatherService';
import type { City } from '../../src/types/weather';

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('searchCities', () => {
  it('retorna lista vazia sem chamar a rede quando o nome está vazio', async () => {
    await expect(searchCities('  \t  ')).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('codifica o nome e mapeia os resultados para City', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          results: [
            {
              id: 1,
              name: 'São Paulo',
              latitude: -23.55,
              longitude: -46.63,
              country: 'Brasil',
              country_code: 'BR',
              admin1: 'São Paulo',
              timezone: 'America/Sao_Paulo',
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    await expect(searchCities('  São Paulo  ')).resolves.toEqual([
      {
        id: 1,
        name: 'São Paulo',
        latitude: -23.55,
        longitude: -46.63,
        country: 'Brasil',
        countryCode: 'BR',
        region: 'São Paulo',
        timeZone: 'America/Sao_Paulo',
      },
    ]);

    const requestUrl = String(fetchMock.mock.calls[0]?.[0]);
    expect(requestUrl).toContain('name=S%C3%A3o%20Paulo');
    expect(requestUrl).toContain('language=pt');
  });

  it('retorna lista vazia quando o Geocoding não encontra cidades', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ generationtime_ms: 0.1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(searchCities('São Paulo')).resolves.toEqual([]);
  });

  it('lança WeatherServiceError para resposta HTTP não-ok', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 503 }));
    const search = searchCities('São Paulo');

    await expect(search).rejects.toBeInstanceOf(WeatherServiceError);
    await expect(search).rejects.toMatchObject({ status: 503 });
  });

  it('converte falhas de rede em WeatherServiceError', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('fetch failed'));

    await expect(searchCities('São Paulo')).rejects.toMatchObject({
      name: 'WeatherServiceError',
      message: 'Falha de rede.',
    });
  });

  it('converte AbortError em timeout e limpa o timer', async () => {
    vi.useFakeTimers();
    let requestSignal: AbortSignal | null | undefined;
    fetchMock.mockImplementation((_input, init) => {
      requestSignal = init?.signal;

      return new Promise<Response>((_resolve, reject) => {
        requestSignal?.addEventListener(
          'abort',
          () => reject(new DOMException('Aborted', 'AbortError')),
          { once: true },
        );
      });
    });

    const request = searchCities('São Paulo');
    const requestError = request.catch((error: unknown) => error);
    await vi.advanceTimersByTimeAsync(10_000);

    await expect(requestError).resolves.toMatchObject({
      name: 'WeatherServiceError',
      message: 'A requisição demorou demais.',
    });
    expect(requestSignal?.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('limpa o timeout após uma resposta rápida', async () => {
    vi.useFakeTimers();
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ results: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(searchCities('São Paulo')).resolves.toEqual([]);
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe('getWeather', () => {
  const city: City = {
    id: 1,
    name: 'São Paulo',
    latitude: -23.55,
    longitude: -46.63,
    timeZone: 'America/Sao_Paulo',
  };

  function createForecastResponse() {
    return {
      current: {
        time: '2026-09-30T12:15',
        temperature_2m: 22.4,
        apparent_temperature: 23.1,
        relative_humidity_2m: 58,
        weather_code: 1,
        precipitation: 0,
        cloud_cover: 20,
        pressure_msl: 1013.2,
        wind_speed_10m: 12.6,
        wind_direction_10m: 140,
        is_day: 1,
      },
      daily: {
        time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
        weather_code: [1, 3, 61, 2, 0],
        temperature_2m_min: [15, 16, 17, 16, 15],
        temperature_2m_max: [25, 26, 24, 24, 26],
        precipitation_probability_max: [10, 20, 65, 25, 5],
        precipitation_sum: [0, 0.4, 4.2, 0.2, 0],
        wind_speed_10m_max: [18, 20, 23, 18, 15],
        wind_direction_10m_dominant: [140, 155, 170, 130, 115],
      },
    };
  }

  it('mapeia current e os arrays paralelos de daily para cinco dias', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(createForecastResponse()), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const weather = await getWeather(city);

    expect(weather.city).toEqual(city);
    expect(weather.current).toMatchObject({
      observedAt: '2026-09-30T12:15',
      temperatureC: 22.4,
      apparentTemperatureC: 23.1,
      relativeHumidityPercent: 58,
      weatherCode: 1,
      pressureMslHpa: 1013.2,
      isDay: true,
    });
    expect(weather.forecast).toHaveLength(5);
    expect(weather.forecast[2]).toMatchObject({
      localDate: '2026-10-02',
      weatherCode: 61,
      temperatureMinC: 17,
      temperatureMaxC: 24,
      precipitationProbabilityMaxPercent: 65,
      precipitationSumMm: 4.2,
      windSpeedMaxKmh: 23,
      windDirectionDominantDegrees: 170,
    });
    expect(Number.isNaN(Date.parse(weather.fetchedAt))).toBe(false);

    const requestUrl = String(fetchMock.mock.calls[0]?.[0]);
    expect(requestUrl).toContain('latitude=-23.55');
    expect(requestUrl).toContain('timezone=America%2FSao_Paulo');
    expect(requestUrl).toContain('forecast_days=5');
    expect(requestUrl).toContain('current=');
    expect(requestUrl).toContain('daily=');
  });

  it.each([
    'current',
    'daily',
  ] as const)('lança WeatherServiceError quando %s está ausente', async (missingSection) => {
    const payload: Record<string, unknown> = createForecastResponse();
    delete payload[missingSection];
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(getWeather(city)).rejects.toBeInstanceOf(WeatherServiceError);
  });
});
