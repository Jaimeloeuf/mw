/**
 * This is basically the same as `Promise.all` and is in fact just a wrapper on
 * top of it for a better type safe DX, to let you write type safe concurrent
 * data loading patterns.
 *
 * Basically this is a wrapper to solve the problem of "data name" and
 * "data promise" colocation problem where the data name definition is done
 * elsewhere from the data promise passed into Promise.all since it is tuple
 * based and not object based.
 *
 * ## Example
 *
 * Instead of destructuring values from a tuple which you could name wrongly or
 * just use in the wrong order (which becomes harder when this list is alot
 * longer) like this:
 * ```typescript
 * const [bucketlist, bucketlistItems] = await Promise.all([
 *   db
 *     .selectFrom("bucketlist")
 *     .selectAll()
 *     .where("id", "=", id)
 *     .executeTakeFirst(),
 *   db
 *     .selectFrom("bucketlist_item")
 *     .selectAll()
 *     .where("bucketlist_id", "=", id)
 *     .execute(),
 * ]);
 * ```
 *
 * With this function, you can pass in an object instead with the names of the
 * values defined as the object's keys right alongside the value definition.
 * Which automatically provides you with type inference on what values are
 * available when you destructure them out like this:
 * ```typescript
 * const { bucketlist, bucketlistItems } = await concurrent({
 *   bucketlist: db
 *     .selectFrom("bucketlist")
 *     .selectAll()
 *     .where("id", "=", id)
 *     .executeTakeFirst(),
 *   bucketlistItems: db
 *     .selectFrom("bucketlist_item")
 *     .selectAll()
 *     .where("bucketlist_id", "=", id)
 *     .execute(),
 * });
 * ```
 */
export async function concurrent<
  Awaitable extends Promise<any>,
  AwaitableObject extends Record<string, Awaitable>,
  AwaitedObject extends {
    [Property in keyof AwaitableObject]: Awaited<AwaitableObject[Property]>;
  },
>(awaitables: AwaitableObject): Promise<AwaitedObject> {
  const awaitableEntries = Object.entries(awaitables);
  const awaitableValues = awaitableEntries.map((entry) => entry[1]);
  const awaitedValues = await Promise.all(awaitableValues);
  const awaitedObject: Partial<AwaitedObject> = {};

  for (let i = 0; i < awaitedValues.length; i++) {
    // Safe to use ! non-null assertion operator as we are sure it is valueof/keyof T
    const awaitedValue = awaitedValues[i]!;
    const key = awaitableEntries[i]![0] as keyof AwaitableObject;
    awaitedObject[key] = awaitedValue;
  }

  return awaitedObject as AwaitedObject;
}
