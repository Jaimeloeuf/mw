/**
 * Utility to get the data back if it is not null/undefined, else if it is null/
 * undefined, this will throw an Error.
 */
export function dataOrThrow<T>(
  data: T | null | undefined,
  optionalErrorMessage?: string,
): T {
  if (data === null || data === undefined) {
    throw new Error(
      optionalErrorMessage ?? `${dataOrThrow.name} found ${data}`,
    );
  }
  return data;
}
