/**
 * Declaring all globally available utility types here with a $ prefix to
 * signify that these are in the global scope.
 */
declare global {
  /**
   * Unions a given generic type with `null`.
   *
   * I.e. a `$Nullable<T>` will become `T | null`.
   */
  type $Nullable<T> = T | null;

  /**
   * Constrain Type to ensure that statically defined Array values are non-empty
   * containing at least one value.
   *
   * - `[]` is invalid
   * - `[T]` is valid
   * - `[T, T, T]` is valid
   */
  type $NonEmptyArray<T> = [T, ...T[]];
}
