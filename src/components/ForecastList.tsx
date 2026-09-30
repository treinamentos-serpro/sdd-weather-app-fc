import type { ForecastDay, Unit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: Unit;
  timeZone?: string;
}

export default function ForecastList({ forecast, unit, timeZone }: ForecastListProps) {
  return (
    <section aria-labelledby="forecast-title">
      <h2 className="text-lg font-semibold text-white" id="forecast-title">
        Previsão
      </h2>
      {forecast.length === 0 ? (
        <p className="mt-3 text-sm text-white/70" role="status">
          Previsão indisponível.
        </p>
      ) : (
        <ol className="mt-4 grid grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {forecast.map((day) => (
            <ForecastCard day={day} key={day.localDate} timeZone={timeZone} unit={unit} />
          ))}
        </ol>
      )}
    </section>
  );
}
