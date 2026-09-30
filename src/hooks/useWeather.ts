import { useEffect, useRef, useState } from 'react';
import { getWeather, searchCities } from '../services/weatherService';
import type { City, WeatherData } from '../types/weather';

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type LastOperation = { type: 'search'; name: string } | { type: 'weather'; city: City } | null;

export interface UseWeatherResult {
  status: WeatherStatus;
  data: WeatherData | null;
  cities: City[];
  error: string | null;
  query: string;
  search: (name: string) => Promise<void>;
  selectCity: (city: City) => Promise<void>;
  retry: () => Promise<void>;
}

function getErrorMessage(cause: unknown): string {
  return cause instanceof Error ? cause.message : 'Não foi possível carregar os dados do clima.';
}

export function useWeather(): UseWeatherResult {
  const [status, setStatus] = useState<WeatherStatus>('idle');
  const [data, setData] = useState<WeatherData | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const requestId = useRef(0);
  const lastOperation = useRef<LastOperation>(null);

  useEffect(() => {
    return () => {
      requestId.current += 1;
    };
  }, []);

  async function loadCityWeather(city: City, currentRequestId: number): Promise<void> {
    try {
      const weather = await getWeather(city);
      if (currentRequestId !== requestId.current) return;

      setData(weather);
      setError(null);
      setStatus('success');
    } catch (cause) {
      if (currentRequestId !== requestId.current) return;

      setData(null);
      setError(getErrorMessage(cause));
      setStatus('error');
    }
  }

  async function search(name: string): Promise<void> {
    const normalizedName = name.trim();
    setQuery(normalizedName);
    setData(null);
    setCities([]);
    setError(null);

    if (normalizedName.length === 0) {
      requestId.current += 1;
      lastOperation.current = null;
      setStatus('idle');
      return;
    }

    lastOperation.current = { type: 'search', name: normalizedName };
    const currentRequestId = ++requestId.current;
    setStatus('loading');

    try {
      const results = await searchCities(normalizedName);
      if (currentRequestId !== requestId.current) return;

      setCities(results);
      if (results.length === 0) {
        setStatus('empty');
        return;
      }

      setStatus('success');
    } catch (cause) {
      if (currentRequestId !== requestId.current) return;

      setError(getErrorMessage(cause));
      setStatus('error');
    }
  }

  async function selectCity(city: City): Promise<void> {
    const currentRequestId = ++requestId.current;
    lastOperation.current = { type: 'weather', city };
    setQuery(city.name);
    setCities([]);
    setData(null);
    setError(null);
    setStatus('loading');
    await loadCityWeather(city, currentRequestId);
  }

  async function retry(): Promise<void> {
    const operation = lastOperation.current;
    if (!operation) return;

    if (operation.type === 'search') {
      await search(operation.name);
      return;
    }

    await selectCity(operation.city);
  }

  return { status, data, cities, error, query, search, selectCity, retry };
}
