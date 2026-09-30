import { formatTemperature } from '../lib/temperature';
import { getWeatherInfo } from '../lib/weatherCodes';
import type { City, CurrentWeather as CurrentWeatherData, Unit } from '../types/weather';

interface CurrentWeatherProps {
  city: City;
  current: CurrentWeatherData;
  unit: Unit;
}

function formatMetric(value: number | null | undefined, suffix: string): string {
  if (value == null) return '—';

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 1,
  }).format(value);

  return `${formattedValue}${suffix}`;
}

export default function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  const weatherInfo = getWeatherInfo(current.weatherCode);
  const location = [city.region, city.country].filter(Boolean).join(', ');
  const windDirection =
    current.windDirectionDegrees == null
      ? ''
      : ` · ${formatMetric(current.windDirectionDegrees, '°')}`;

  const metrics = [
    {
      label: 'Umidade',
      value: formatMetric(current.relativeHumidityPercent, '%'),
    },
    {
      label: 'Vento',
      value: `${formatMetric(current.windSpeedKmh, ' km/h')}${windDirection}`,
    },
    {
      label: 'Precipitação',
      value: formatMetric(current.precipitationMm, ' mm'),
    },
    {
      label: 'Pressão',
      value: formatMetric(current.pressureMslHpa, ' hPa'),
    },
  ];

  return (
    <section
      aria-labelledby="current-weather-title"
      className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-glass backdrop-blur-md sm:p-7"
    >
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/70">{location}</p>
          <h2 className="mt-1 text-xl font-semibold text-white" id="current-weather-title">
            {city.name}
          </h2>
        </div>

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span aria-hidden="true" className="text-5xl sm:text-6xl">
            {weatherInfo.icon}
          </span>
          <div className="min-w-0">
            <p className="text-sm text-white/75">{weatherInfo.condition}</p>
            <p className="mt-1 text-4xl font-semibold leading-none tabular-nums text-white sm:text-6xl">
              {formatTemperature(current.temperatureC, unit)}
            </p>
          </div>
        </div>
      </header>

      <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map(({ label, value }) => (
          <div className="rounded-xl border border-white/10 bg-night-800/60 p-3" key={label}>
            <dt className="text-xs text-white/65">{label}</dt>
            <dd className="mt-1 font-medium text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
