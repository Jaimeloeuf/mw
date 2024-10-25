import { dalWrapper } from "../dalWrapper.js";

import { createLeetcodeQues } from "./createLeetcodeQues.js";

export const leetcodeRepo = {
  createLeetcodeQues: dalWrapper(createLeetcodeQues),
};
