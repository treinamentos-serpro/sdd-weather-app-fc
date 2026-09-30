import { type FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSearch, disabled = false }: SearchBarProps) {
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
    </form>
  );
}
