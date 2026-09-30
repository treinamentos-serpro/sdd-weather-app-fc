export type Unit = 'celsius' | 'fahrenheit'; // Unidade de exibição da temperatura.

export interface City {
  id: number; // Identificador retornado pelo Geocoding.
  name: string; // Nome da cidade para exibição.
  latitude: number; // Latitude usada na consulta de previsão.
  longitude: number; // Longitude usada na consulta de previsão.
  country?: string; // País, quando retornado.
  countryCode?: string; // Código do país, quando retornado.
  region?: string; // Estado ou divisão administrativa, quando disponível.
  timeZone?: string; // Fuso horário local, quando disponível.
}

export interface CurrentWeather {
  observedAt?: string; // Horário da observação meteorológica.
  temperatureC?: number | null; // Temperatura do ar em Celsius.
  apparentTemperatureC?: number | null; // Sensação térmica em Celsius.
  relativeHumidityPercent?: number | null; // Umidade relativa em porcentagem.
  weatherCode?: number | null; // Código WMO da condição meteorológica.
  precipitationMm?: number | null; // Precipitação em milímetros.
  cloudCoverPercent?: number | null; // Cobertura de nuvens em porcentagem.
  pressureMslHpa?: number | null; // Pressão ao nível do mar em hPa.
  windSpeedKmh?: number | null; // Velocidade do vento em km/h.
  windDirectionDegrees?: number | null; // Direção do vento em graus.
  isDay?: boolean | null; // Indica se a observação ocorreu durante o dia.
}

export interface ForecastDay {
  localDate: string; // Data local no formato ISO 8601 (AAAA-MM-DD).
  weatherCode?: number | null; // Código WMO da condição prevista.
  temperatureMinC?: number | null; // Temperatura mínima em Celsius.
  temperatureMaxC?: number | null; // Temperatura máxima em Celsius.
  precipitationProbabilityMaxPercent?: number | null; // Probabilidade máxima em porcentagem.
  precipitationSumMm?: number | null; // Precipitação total em milímetros.
  windSpeedMaxKmh?: number | null; // Velocidade máxima do vento em km/h.
  windDirectionDominantDegrees?: number | null; // Direção dominante do vento em graus.
}

export interface WeatherData {
  city: City; // Localidade associada aos dados.
  current: CurrentWeather; // Observação meteorológica atual.
  forecast: ForecastDay[]; // Previsões para a janela de cinco dias.
  fetchedAt: string; // Instante UTC em que a resposta foi recebida.
}
