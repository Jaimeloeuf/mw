/**
 * Utility type to make the specified key in an object optional.
 */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/**
 * Utility type to make the `id` key of an object optional.
 */
export type OptionalID<T extends { id: any }> = Optional<T, "id">;

/**
 * Utility function to generate and inject an `id` field into an object with a
 * possibly optional `id`. Does nothing if the `id` field is not null/undefined.
 */
export function injectID<T extends { id: any }>(
  objectWithoutID: OptionalID<T>,
): T {
  // If ID property not equals to null/undefined, assume it is supplied
  if (objectWithoutID["id"] != null) {
    return objectWithoutID as T;
  }
  objectWithoutID["id"] = $UUID.generate();
  return objectWithoutID as T;
}
