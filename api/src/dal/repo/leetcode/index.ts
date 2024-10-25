import { dalWrapper } from "../dalWrapper.js";

import { getLeetcodeQues } from "./getLeetcodeQues.js";
import { createLeetcodeQues } from "./createLeetcodeQues.js";

export const leetcodeRepo = {
  getLeetcodeQues: dalWrapper(getLeetcodeQues),
  createLeetcodeQues: dalWrapper(createLeetcodeQues),
};
