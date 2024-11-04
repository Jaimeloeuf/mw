import { df } from "../../__generated/index.js";

/**
 * Create a new bucketlist.
 */
export async function createBucketlist(name: string, description: string) {
  const bucketlist = await df.createBucketlist.getResultOrThrowOnError({
    name,
    description,
  });

  return bucketlist;
}
