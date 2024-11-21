/**
 * Given a mapped type, change it to `void` if all its properties are `void`,
 * else return T as it is.
 *
 * E.g. usecase
 * ```typescript
 * type Options = VoidIfAllPropertiesInObjectIsVoid<{
 *   urlParams: void;
 *   urlQueryParams: void;
 * }>
 * ```
 * Type `Options` here becomes `void`
 */
export type VoidIfAllPropertiesInObjectIsVoid<T> = T extends {
  [K in keyof T]: void;
}
  ? void
  : T;
