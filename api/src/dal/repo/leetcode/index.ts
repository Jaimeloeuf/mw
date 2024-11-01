import { dataFn } from "../dataFn.js";

import { getLeetcodeQues } from "./getLeetcodeQues.df.js";
import { createLeetcodeQues } from "./createLeetcodeQues.df.js";

export const leetcodeRepo = {
  getLeetcodeQues: dataFn(getLeetcodeQues),
  createLeetcodeQues: dataFn(createLeetcodeQues),
};
