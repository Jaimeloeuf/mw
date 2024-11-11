import type { LeetcodeQues } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { concurrent } from "../../../utils/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function leetcodeGetLeetcodeQues(
  leetcodeQuesID: LeetcodeQues["id"],
) {
  const { leetcodeQues, leetcodeQuesTags } = await concurrent({
    leetcodeQues: apiDB
      .selectFrom("leetcode_ques")
      .selectAll()
      .where("id", "=", leetcodeQuesID)
      .executeTakeFirst(),

    leetcodeQuesTags: apiDB
      .selectFrom("leetcode_ques_tag")
      .selectAll()
      .where("ques_id", "=", leetcodeQuesID)
      .execute(),
  });

  if (leetcodeQues === undefined) {
    throw new NotFoundException(
      `Cannot find leetcode question '${leetcodeQuesID}'`,
    );
  }

  const tags = await apiDB
    .selectFrom("leetcode_tag")
    .select("tag")
    .where(
      "id",
      "in",
      leetcodeQuesTags.map((quesTag) => quesTag.tag_id),
    )
    .execute()
    .then((tags) => tags.map((tag) => tag.tag));

  return {
    ...leetcodeQues,
    tags,
  };
});
