import { bucketlistRepo } from "../../dal/index.js";
import { errorToServiceException } from "../../exceptions/index.js";

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
    throw errorToServiceException(bucketlistCreationResult);
  }

  return bucketlistCreationResult;
}
