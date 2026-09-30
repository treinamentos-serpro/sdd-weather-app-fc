export interface WeatherInfo {
  condition: string;
  icon: string;
}

const weatherInfoByCode: Record<number, WeatherInfo> = {
  0: { condition: 'Céu limpo', icon: '☀️' },
  1: { condition: 'Predominantemente limpo', icon: '🌤️' },
  2: { condition: 'Parcialmente nublado', icon: '⛅' },
  3: { condition: 'Nublado', icon: '☁️' },
  45: { condition: 'Nevoeiro', icon: '🌫️' },
  48: { condition: 'Nevoeiro com geada', icon: '🌫️' },
  51: { condition: 'Chuvisco leve', icon: '🌦️' },
  53: { condition: 'Chuvisco moderado', icon: '🌦️' },
  55: { condition: 'Chuvisco intenso', icon: '🌧️' },
  56: { condition: 'Chuvisco congelante leve', icon: '🌧️' },
  57: { condition: 'Chuvisco congelante intenso', icon: '🌧️' },
  61: { condition: 'Chuva leve', icon: '🌧️' },
  63: { condition: 'Chuva moderada', icon: '🌧️' },
  65: { condition: 'Chuva intensa', icon: '🌧️' },
  66: { condition: 'Chuva congelante leve', icon: '🌧️' },
  67: { condition: 'Chuva congelante intensa', icon: '🌧️' },
  71: { condition: 'Neve leve', icon: '🌨️' },
  73: { condition: 'Neve moderada', icon: '🌨️' },
  75: { condition: 'Neve intensa', icon: '❄️' },
  77: { condition: 'Grãos de neve', icon: '🌨️' },
  80: { condition: 'Pancadas de chuva leves', icon: '🌦️' },
  81: { condition: 'Pancadas de chuva moderadas', icon: '🌧️' },
  82: { condition: 'Pancadas de chuva violentas', icon: '⛈️' },
  85: { condition: 'Pancadas de neve leves', icon: '🌨️' },
  86: { condition: 'Pancadas de neve intensas', icon: '🌨️' },
  95: { condition: 'Trovoada', icon: '⛈️' },
  96: { condition: 'Trovoada com granizo leve', icon: '⛈️' },
  99: { condition: 'Trovoada com granizo intenso', icon: '⛈️' },
};

export function getWeatherInfo(weatherCode: number | null | undefined): WeatherInfo {
  if (weatherCode == null) {
    return { condition: 'Condição indisponível', icon: '—' };
  }

  return (
    weatherInfoByCode[weatherCode] ?? {
      condition: 'Condição desconhecida',
      icon: '—',
    }
  );
}
