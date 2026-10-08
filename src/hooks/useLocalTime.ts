import { useEffect, useState } from 'react';

/** The current time in a given IANA time zone, refreshed every 20 seconds. */
export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = window.setInterval(() => setTime(format(timeZone)), 20_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

function format(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date());
  } catch {
    return '';
  }
}
