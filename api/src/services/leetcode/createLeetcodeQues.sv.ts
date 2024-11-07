import { df } from "../../__generated/index.js";

/**
 * Create a new leetcode question.
 */
export default async function (ques: { url: string; tags: Array<string> }) {
  return df.leetcodeCreateLeetcodeQues.getResultOrThrowOnError(ques);
}
