import { leetcodeRepo } from "../../dal/index.js";

/**
 * Get a leetcode question.
 */
export async function getLeetcodeQues(bucketlistID: string) {
  return leetcodeRepo.getLeetcodeQues.getResultOrThrowOnError(bucketlistID);
}
