import { leetcodeRepo } from "../../dal/index.js";

/**
 * Create a new leetcode question.
 */
export async function createLeetcodeQues(ques: {
  url: string;
  tags: Array<string>;
}) {
  return leetcodeRepo.createLeetcodeQues.getResultOrThrowOnError(ques);
}
