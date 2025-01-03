import { df } from "../../__generated/index.js";

/**
 * Get a bucketlist.
 */
export default async function (bucketlistID: string) {
  const bucketlist =
    await df.bucketlistGetBucketlist.runAndThrowOnError(bucketlistID);

  return bucketlist;
}
