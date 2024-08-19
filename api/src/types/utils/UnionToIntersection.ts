/**
 * Converts a union type like `type1 | type1` to an intersection type like
 * `type1 & type2`.
 *
 * https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
