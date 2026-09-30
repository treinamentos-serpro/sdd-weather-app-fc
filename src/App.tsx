import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import { useWeather } from './hooks/useWeather';
import type { Unit } from './types/weather';

export default function App() {
  const [unit, setUnit] = useState<Unit>('celsius');
  const { status, data, cities, error, query, search, selectCity, retry } = useWeather();

  function renderContent() {
    switch (status) {
      case 'idle':
        return (
          <EmptyState
            hint="Use a busca acima para consultar as condições e a previsão de uma cidade."
            title="Consulte o clima da sua cidade"
          />
        );
      case 'loading':
        return <LoadingState message={`Buscando o clima de ${query}…`} />;
      case 'empty':
        return (
          <EmptyState
            hint="Confira a grafia ou tente buscar outra cidade."
            title={`Nenhuma cidade encontrada para “${query}”`}
          />
        );
      case 'error':
        return (
          <ErrorState
            message={error ?? 'Não foi possível carregar os dados do clima.'}
            onRetry={() => void retry()}
          />
        );
      case 'success':
        if (data) {
          return (
            <div className="space-y-6">
              <CurrentWeather city={data.city} current={data.current} unit={unit} />
              <ForecastList forecast={data.forecast} timeZone={data.city.timeZone} unit={unit} />
            </div>
          );
        }

        if (cities.length > 0) {
          return (
            <EmptyState
              hint="Selecione uma das cidades encontradas para consultar o clima."
              title="Escolha uma cidade"
            />
          );
        }

        return (
          <EmptyState hint="Faça uma nova busca para continuar." title="Selecione uma cidade" />
        );
    }
  }

  return (
    <div className="min-h-screen bg-night-900 text-white">
      <header className="border-b border-white/10 bg-night-800/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              Weather
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Clima por cidade</h1>
          </div>

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end">
            <SearchBar
              cities={cities}
              disabled={status === 'loading'}
              onSearch={(city) => void search(city)}
              onSelectCity={(city) => void selectCity(city)}
            />
            <UnitToggle onChange={setUnit} unit={unit} />
          </div>
        </div>
      </header>

      <main
        aria-busy={status === 'loading'}
        className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-6 sm:py-10"
      >
        {renderContent()}
      </main>
    </div>
  );
}
