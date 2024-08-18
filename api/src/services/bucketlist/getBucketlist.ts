import { bucketlistRepo } from "../../dal/index.js";

/**
 * Get a bucketlist.
 */
export async function getBucketlist(bucketlistID: string) {
  const bucketlist =
    await bucketlistRepo.getBucketlist.getResultOrThrowOnError(bucketlistID);

  return bucketlist;
}
