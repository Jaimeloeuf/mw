import type { CreateBlogSubscriber } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

export default dataFn(function createBlogSubscriber(
  blogSubscriber: OptionalID<CreateBlogSubscriber>,
) {
  return apiDB
    .insertInto("blog_subscriber")
    .values(injectID(blogSubscriber))
    .returningAll()
    .executeTakeFirstOrThrow();
});
