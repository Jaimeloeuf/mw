import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { BlogSubscriber } from "../../kysely/index.js";

export default dataFn(async function deleteBlogSubscriber(
  id: BlogSubscriber["id"],
) {
  await apiDB
    .deleteFrom("blog_subscriber")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
});
