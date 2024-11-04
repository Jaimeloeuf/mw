import { df } from "../../__generated/index.js";

/**
 * Get a bucketlist.
 */
export async function getBucketlist(bucketlistID: string) {
  const bucketlist =
    await df.bucketlistGetBucketlist.getResultOrThrowOnError(bucketlistID);

  return bucketlist;
}
