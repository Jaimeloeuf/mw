import { bucketlistRepo } from "../../dal/index.js";

/**
 * Create a new bucketlist.
 */
export async function createBucketlist(name: string, description: string) {
  const bucketlist =
    await bucketlistRepo.createBucketlist.getResultOrThrowOnError({
      name,
      description,
    });

  return bucketlist;
}
