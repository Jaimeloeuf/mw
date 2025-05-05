declare global {
  /**
   * Unions a given generic type with `null` and `void` and `undefined`.
   *
   * Sometimes a value may or may not be provided, for e.g. like a function
   * parameter, and the same function parameter could also take in a `null` as a
   * valid value, in cases like these, this type can be helpful, but for most
   * use cases prefer `$Nullable` instead.
   *
   * I.e. a `$NullableAndOptional<T>` will become `T | null | void | undefined`.
   */
  type $NullableAndOptional<T> = T | null | void | undefined;
}
