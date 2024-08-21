/**
 * Constrain Type to ensure that statically defined Array values are non-empty
 * containing at least one value.
 */
export type NonEmptyArray<T> = [T, ...T[]];
