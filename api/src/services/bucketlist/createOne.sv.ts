import { df } from "../../__generated/index.js";

/**
 * Create a new bucketlist.
 */
export default async function (name: string, description: string) {
  const bucketlist =
    await df.bucketlistCreateBucketlist.getResultOrThrowOnError({
      name,
      description,
    });

  return bucketlist;
}
