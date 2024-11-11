import { df } from "../../__generated/index.js";

/**
 * Get a leetcode question.
 */
export default async function (bucketlistID: string) {
  return df.leetcodeGetLeetcodeQues.runAndThrowOnError(bucketlistID);
}
