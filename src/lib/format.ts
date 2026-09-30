function parseLocalDate(localDate: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(localDate);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day, 12));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function getDateInTimeZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    timeZone,
    year: 'numeric',
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value;

  return `${part('year')}-${part('month')}-${part('day')}`;
}

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase('pt-BR') + value.slice(1);
}

export function formatDayLabel(localDate: string, timeZone?: string, now = new Date()): string {
  const date = parseLocalDate(localDate);
  if (!date) return localDate;

  if (timeZone) {
    try {
      const today = getDateInTimeZone(now, timeZone);
      const dayDifference = (date.getTime() - Date.parse(`${today}T12:00:00Z`)) / 86_400_000;

      if (dayDifference === 0) return 'Hoje';
      if (dayDifference === 1) return 'Amanhã';
    } catch {
      // Mantém o rótulo do dia da semana quando o fuso não for reconhecido.
    }
  }

  return capitalize(
    new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      timeZone: 'UTC',
    }).format(date),
  );
}

export function formatShortDate(localDate: string): string {
  const date = parseLocalDate(localDate);
  if (!date) return localDate;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}
