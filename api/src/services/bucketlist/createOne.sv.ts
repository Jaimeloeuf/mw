import { df } from "../../__generated/index.js";

/**
 * Create a new bucketlist.
 */
export default async function (name: string, description: string) {
  const bucketlist = await df.bucketlistCreateBucketlist.runAndThrowOnError({
    created_at: $DateTime.now.asIsoDateTime(),
    name,
    description,
  });

  return bucketlist;
}
