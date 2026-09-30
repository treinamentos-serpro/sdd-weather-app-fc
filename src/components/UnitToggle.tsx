import type { Unit } from '../types/weather';

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  const buttonClassName =
    'min-h-10 min-w-11 rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900';

  return (
    <div
      aria-label="Unidade de temperatura"
      className="inline-flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1 shadow-glass backdrop-blur-md"
      role="group"
    >
      <button
        aria-label="Celsius"
        aria-pressed={unit === 'celsius'}
        className={`${buttonClassName} ${unit === 'celsius' ? 'bg-accent-400 text-night-900' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
        onClick={() => onChange('celsius')}
        type="button"
      >
        °C
      </button>
      <button
        aria-label="Fahrenheit"
        aria-pressed={unit === 'fahrenheit'}
        className={`${buttonClassName} ${unit === 'fahrenheit' ? 'bg-accent-400 text-night-900' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
        onClick={() => onChange('fahrenheit')}
        type="button"
      >
        °F
      </button>
    </div>
  );
}
