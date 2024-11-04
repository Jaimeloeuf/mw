import { df } from "../../__generated/index.js";

/**
 * Create a new leetcode question.
 */
export async function createLeetcodeQues(ques: {
  url: string;
  tags: Array<string>;
}) {
  return df.createLeetcodeQues.getResultOrThrowOnError(ques);
}
