declare global {
  /**
   * Unions a given generic type with `void` and `undefined`.
   *
   * Sometimes a value may or may not be provided, for e.g. like a function
   * parameter, which is why this is called "optional", but for most use cases,
   * prefer `$Nullable` instead.
   *
   * I.e. a `$Optional<T>` will become `T | void | undefined`.
   */
  type $Optional<T> = T | void | undefined;
}
