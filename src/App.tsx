import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import { mockWeatherData } from './mocks/weatherData';
import type { Unit, WeatherData } from './types/weather';

type WeatherViewState =
  | { status: 'idle' }
  | { status: 'loading'; query: string }
  | { status: 'empty'; query: string }
  | { status: 'error'; query: string; message: string }
  | { status: 'success'; data: WeatherData };

function normalizeCityName(city: string): string {
  return city
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLocaleLowerCase('pt-BR');
}

export default function App() {
  const [unit, setUnit] = useState<Unit>('celsius');
  const [viewState, setViewState] = useState<WeatherViewState>({ status: 'idle' });

  async function searchCity(city: string) {
    setViewState({ status: 'loading', query: city });

    try {
      // Simula latência para que o estado de carregamento seja visível durante o desenvolvimento da UI.
      await new Promise<void>((resolve) => window.setTimeout(resolve, 250));

      const query = normalizeCityName(city);
      const mockCity = normalizeCityName(mockWeatherData.city.name);

      if (query !== mockCity) {
        setViewState({ status: 'empty', query: city });
        return;
      }

      setViewState({ status: 'success', data: mockWeatherData });
    } catch {
      setViewState({
        status: 'error',
        query: city,
        message: 'Não foi possível carregar os dados do clima.',
      });
    }
  }

  function renderContent() {
    switch (viewState.status) {
      case 'idle':
        return (
          <EmptyState
            hint="Use a busca acima para consultar as condições e a previsão de uma cidade."
            title="Consulte o clima da sua cidade"
          />
        );
      case 'loading':
        return <LoadingState message={`Buscando o clima de ${viewState.query}…`} />;
      case 'empty':
        return (
          <EmptyState
            hint="Confira a grafia ou tente buscar São Paulo, a cidade disponível neste mock."
            title={`Nenhuma cidade encontrada para “${viewState.query}”`}
          />
        );
      case 'error':
        return (
          <ErrorState
            message={viewState.message}
            onRetry={() => void searchCity(viewState.query)}
          />
        );
      case 'success':
        return (
          <div className="space-y-6">
            <CurrentWeather
              city={viewState.data.city}
              current={viewState.data.current}
              unit={unit}
            />
            <ForecastList
              forecast={viewState.data.forecast}
              timeZone={viewState.data.city.timeZone}
              unit={unit}
            />
          </div>
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
            <SearchBar disabled={viewState.status === 'loading'} onSearch={searchCity} />
            <UnitToggle onChange={setUnit} unit={unit} />
          </div>
        </div>
      </header>

      <main
        aria-busy={viewState.status === 'loading'}
        className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-6 sm:py-10"
      >
        <p className="text-sm text-white/55" role="note">
          Ambiente de demonstração com dados locais para São Paulo.
        </p>
        {renderContent()}
      </main>
    </div>
  );
}
