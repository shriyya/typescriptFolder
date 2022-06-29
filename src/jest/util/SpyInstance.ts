export type SpyInstance<T extends (...args: unknown[]) => unknown> =
  jest.SpyInstance<ReturnType<T>, Parameters<T>>;
