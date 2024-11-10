import type {
  CreateLeetcodeQues,
  CreateLeetcodeQuesTag,
} from "../../kysely/index.js";

import { ServiceException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID } from "../injectID.js";

export default dataFn(async function createLeetcodeQues(leetcodeQues: {
  url: string;
  tags: Array<string>;
}) {
  const createdLeetcodeQues = await apiDB
    .insertInto("leetcode_ques")
    .values(
      injectID<CreateLeetcodeQues>({
        url: leetcodeQues.url,
      }),
    )
    .returningAll()
    .executeTakeFirst();

  if (createdLeetcodeQues === undefined) {
    throw new ServiceException("Failed to save new Leetcode Question");
  }

  const createdLeetcodeTags = await apiDB
    .insertInto("leetcode_tag")
    .values(leetcodeQues.tags.map((tag) => injectID({ tag })))
    .returningAll()
    .execute();

  // Can assume this doesnt exist since the question is just created
  await apiDB
    .insertInto("leetcode_ques_tag")
    .values(
      createdLeetcodeTags.map((tag) =>
        injectID<CreateLeetcodeQuesTag>({
          ques_id: createdLeetcodeQues.id,
          tag_id: tag.id,
        }),
      ),
    )
    .returningAll()
    .execute();

  return {
    ...createdLeetcodeQues,
    tags: leetcodeQues.tags,
  };
});
