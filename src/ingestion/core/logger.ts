/** Minimal timestamped, namespaced console logger. */

const ts = () => new Date().toISOString().slice(11, 19); // HH:MM:SS

export function createLogger(namespace: string) {
  const prefix = () => `[${ts()}] ${namespace}`;
  return {
    info: (msg: string, ...rest: unknown[]) =>
      console.log(`${prefix()} ${msg}`, ...rest),
    warn: (msg: string, ...rest: unknown[]) =>
      console.warn(`${prefix()} ⚠ ${msg}`, ...rest),
    error: (msg: string, ...rest: unknown[]) =>
      console.error(`${prefix()} ✗ ${msg}`, ...rest),
    success: (msg: string, ...rest: unknown[]) =>
      console.log(`${prefix()} ✓ ${msg}`, ...rest),
  };
}

export type Logger = ReturnType<typeof createLogger>;
