declare global {
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
