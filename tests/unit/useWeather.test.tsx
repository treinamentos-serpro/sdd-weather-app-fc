import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useWeather } from '../../src/hooks/useWeather';

const fetchMock = vi.fn<typeof fetch>();

const firstCity = {
  id: 1,
  name: 'São Paulo',
  latitude: -23.55,
  longitude: -46.63,
  timeZone: 'America/Sao_Paulo',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function geocodingResponse() {
  return jsonResponse({ results: [firstCity, { ...firstCity, id: 2, name: 'Campinas' }] });
}

function weatherResponse() {
  return jsonResponse({
    current: { time: '2026-09-30T12:00', temperature_2m: 18, weather_code: 3 },
    daily: {
      time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
    },
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('useWeather', () => {
  it('começa em idle e não busca com query vazia', async () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.status).toBe('idle');
    await act(async () => result.current.search('  '));

    expect(result.current.status).toBe('idle');
    expect(result.current.query).toBe('');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('entra em empty sem chamar forecast quando a busca não retorna cidades', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ results: [] }));
    const { result } = renderHook(() => useWeather());

    await act(async () => result.current.search('Cidade inexistente'));

    expect(result.current.status).toBe('empty');
    expect(result.current.cities).toEqual([]);
    expect(result.current.data).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('mostra resultados e só carrega o clima após seleção explícita', async () => {
    let resolveGeocoding: (response: Response) => void = () => undefined;
    fetchMock
      .mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            resolveGeocoding = resolve;
          }),
      )
      .mockResolvedValueOnce(weatherResponse());
    const { result } = renderHook(() => useWeather());

    let searchPromise: Promise<void> | undefined;
    await act(async () => {
      searchPromise = result.current.search('São Paulo');
      await Promise.resolve();
    });
    expect(result.current.status).toBe('loading');

    await act(async () => {
      resolveGeocoding(geocodingResponse());
      await searchPromise;
    });

    expect(result.current.status).toBe('success');
    expect(result.current.cities).toHaveLength(2);
    expect(result.current.data).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => result.current.selectCity(result.current.cities[0]!));

    expect(result.current.data?.city.id).toBe(firstCity.id);
    expect(result.current.data?.forecast).toHaveLength(5);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('selectCity carrega a cidade selecionada', async () => {
    fetchMock.mockResolvedValueOnce(weatherResponse());
    const { result } = renderHook(() => useWeather());

    await act(async () => result.current.selectCity(firstCity));

    expect(result.current.status).toBe('success');
    expect(result.current.data?.city).toEqual(firstCity);
  });

  it('retry repete a última consulta meteorológica sem refazer geocoding', async () => {
    fetchMock
      .mockResolvedValueOnce(geocodingResponse())
      .mockResolvedValueOnce(new Response('', { status: 503 }))
      .mockResolvedValueOnce(weatherResponse());
    const { result } = renderHook(() => useWeather());

    await act(async () => result.current.search('São Paulo'));
    expect(result.current.status).toBe('success');
    expect(result.current.data).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => result.current.selectCity(result.current.cities[0]!));
    expect(result.current.status).toBe('error');

    await act(async () => result.current.retry());

    expect(result.current.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
