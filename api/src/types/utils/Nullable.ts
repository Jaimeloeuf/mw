/**
 * Unions a given generic type with `null`.
 *
 * I.e. a `Nullable<T>` will become `T | null`.
 */
export type Nullable<T> = T | null;
