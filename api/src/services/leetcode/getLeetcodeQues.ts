import { df } from "../../__generated/index.js";

/**
 * Get a leetcode question.
 */
export async function getLeetcodeQues(bucketlistID: string) {
  return df.getLeetcodeQues.getResultOrThrowOnError(bucketlistID);
}
