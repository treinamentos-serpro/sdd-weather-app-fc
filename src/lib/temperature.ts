import type { Unit } from '../types/weather';

export function convertTemperature(temperatureC: number, unit: Unit): number {
  if (unit === 'celsius') return temperatureC;
  return (temperatureC * 9) / 5 + 32;
}

export function formatTemperature(temperatureC: number | null | undefined, unit: Unit): string {
  if (temperatureC == null) return '—';

  const value = convertTemperature(temperatureC, unit);
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 1,
  }).format(value);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  return `${formattedValue} ${unitSymbol}`;
}
