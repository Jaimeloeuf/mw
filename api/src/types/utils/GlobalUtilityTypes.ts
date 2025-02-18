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
}
