import { bucketlistRepo } from "../../dal/index.js";

/**
 * Create a new bucketlist.
 */
export async function createBucketlist(name: string, description: string) {
  const bucketlistCreationResult = await bucketlistRepo.createBucketlist({
    id: crypto.randomUUID(),
    name,
    description,
  });

  if (bucketlistCreationResult instanceof Error) {
    throw bucketlistCreationResult;
  }

  return bucketlistCreationResult;
}
