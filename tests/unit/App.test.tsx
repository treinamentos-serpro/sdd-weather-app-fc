import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';

const fetchMock = vi.fn<typeof fetch>();

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('App city search', () => {
  it('clears the previous city and shows a message when geocoding returns no results', async () => {
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({
          results: [
            {
              id: 1,
              name: 'São Paulo',
              latitude: -23.55,
              longitude: -46.63,
              country: 'Brasil',
              admin1: 'São Paulo',
              timezone: 'America/Sao_Paulo',
            },
          ],
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          current: {
            time: '2026-09-30T12:00',
            temperature_2m: 18,
            weather_code: 3,
          },
          daily: {
            time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
          },
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ generationtime_ms: 0.1 }));

    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByRole('searchbox', { name: 'Cidade' });
    await user.type(searchInput, 'São Paulo');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));
    await user.click(
      await screen.findByRole('button', { name: 'Selecionar São Paulo, São Paulo, Brasil' }),
    );
    await screen.findByRole('heading', { name: 'São Paulo' });

    await user.clear(searchInput);
    await user.type(searchInput, 'Cidade inexistente');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    await screen.findByRole('heading', {
      name: 'Nenhuma cidade encontrada para “Cidade inexistente”',
    });
    expect(screen.queryByRole('heading', { name: 'São Paulo' })).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
