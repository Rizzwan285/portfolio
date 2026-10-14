/**
 * sessionStorage can be unavailable (private windows, blocked storage,
 * sandboxed previews). These helpers never throw.
 */
export function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeSession(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* storage unavailable, nothing to persist */
  }
}
