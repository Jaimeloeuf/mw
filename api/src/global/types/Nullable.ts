declare global {
  /**
   * Unions a given generic type with `null`.
   *
   * I.e. a `$Nullable<T>` will become `T | null`.
   */
  type $Nullable<T> = T | null;
}
