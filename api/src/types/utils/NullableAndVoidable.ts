/**
 * Unions a given generic type with `null` and `undefined` and `void`.
 *
 * I.e. a `NullableAndVoidable<T>` will become `T | null | undefined | void`.
 */
export type NullableAndVoidable<T> = T | null;
