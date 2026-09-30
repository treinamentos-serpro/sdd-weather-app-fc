import { formatDayLabel, formatShortDate } from '../lib/format';
import { formatTemperature } from '../lib/temperature';
import { getWeatherInfo } from '../lib/weatherCodes';
import type { ForecastDay, Unit } from '../types/weather';

interface ForecastCardProps {
  day: ForecastDay;
  unit: Unit;
  timeZone?: string;
}

function formatPrecipitationProbability(value: number | null | undefined): string {
  if (value == null) return '—';
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(value)}%`;
}

export default function ForecastCard({ day, unit, timeZone }: ForecastCardProps) {
  const weatherInfo = getWeatherInfo(day.weatherCode);

  return (
    <li className="min-w-0">
      <article
        aria-label={`${formatDayLabel(day.localDate, timeZone)}, ${weatherInfo.condition}`}
        className="h-full rounded-xl border border-white/10 bg-white/5 p-4 shadow-glass backdrop-blur-md"
      >
        <header className="text-center">
          <h3 className="font-semibold text-white">{formatDayLabel(day.localDate, timeZone)}</h3>
          <time className="mt-1 block text-xs text-white/60" dateTime={day.localDate}>
            {formatShortDate(day.localDate)}
          </time>
        </header>

        <div className="mt-4 text-center">
          <span aria-hidden="true" className="text-4xl">
            {weatherInfo.icon}
          </span>
          <p className="mt-2 min-h-10 break-words text-sm text-white/75">{weatherInfo.condition}</p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-xs text-white/60">Máx.</dt>
            <dd className="mt-1 min-w-0 break-words font-semibold text-white">
              {formatTemperature(day.temperatureMaxC, unit)}
            </dd>
          </div>
          <div className="text-right">
            <dt className="text-xs text-white/60">Mín.</dt>
            <dd className="mt-1 min-w-0 break-words font-semibold text-white">
              {formatTemperature(day.temperatureMinC, unit)}
            </dd>
          </div>
          <div className="col-span-2 mt-2 border-t border-white/10 pt-3">
            <dt className="text-xs text-white/60">Probabilidade de chuva</dt>
            <dd className="mt-1 font-medium text-white">
              {formatPrecipitationProbability(day.precipitationProbabilityMaxPercent)}
            </dd>
          </div>
        </dl>
      </article>
    </li>
  );
}
