import { type FormEvent, useState } from 'react';
import type { City } from '../types/weather';

interface SearchBarProps {
  onSearch: (city: string) => void;
  cities: City[];
  onSelectCity: (city: City) => void;
  disabled?: boolean;
}

export default function SearchBar({
  onSearch,
  cities,
  onSelectCity,
  disabled = false,
}: SearchBarProps) {
  const [city, setCity] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCity = city.trim();
    if (disabled || trimmedCity.length === 0) return;

    onSearch(trimmedCity);
  }

  return (
    <form
      aria-label="Buscar cidade"
      className="w-full min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 p-4 shadow-glass backdrop-blur-md"
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="mb-2 block text-sm font-medium text-white" htmlFor="city-search">
        Cidade
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          autoComplete="off"
          className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/10 bg-night-900/70 px-3 py-2 text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled}
          id="city-search"
          name="city"
          onChange={(event) => setCity(event.currentTarget.value)}
          placeholder="Ex.: São Paulo"
          type="search"
          value={city}
        />
        <button
          className="min-h-11 rounded-lg bg-accent-400 px-5 py-2 font-semibold text-night-900 transition-colors hover:bg-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled || city.trim().length === 0}
          type="submit"
        >
          Buscar
        </button>
      </div>
      {cities.length > 0 && (
        <ul
          aria-label="Cidades encontradas"
          className="mt-3 max-h-56 space-y-1 overflow-y-auto rounded-lg border border-white/10 bg-night-900/95 p-2"
        >
          {cities.map((city) => {
            const location = [city.region, city.country].filter(Boolean).join(', ');

            return (
              <li key={city.id}>
                <button
                  aria-label={`Selecionar ${city.name}${location ? `, ${location}` : ''}`}
                  className="flex min-h-11 w-full flex-col items-start rounded-md px-3 py-2 text-left text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-row sm:items-center sm:justify-between"
                  disabled={disabled}
                  onClick={() => onSelectCity(city)}
                  type="button"
                >
                  <span className="font-medium">{city.name}</span>
                  {location && <span className="text-sm text-white/70">{location}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
