import { dalWrapper } from "../dalWrapper.js";

import { getLeetcodeQues } from "./getLeetcodeQues.df.js";
import { createLeetcodeQues } from "./createLeetcodeQues.df.js";

export const leetcodeRepo = {
  getLeetcodeQues: dalWrapper(getLeetcodeQues),
  createLeetcodeQues: dalWrapper(createLeetcodeQues),
};
