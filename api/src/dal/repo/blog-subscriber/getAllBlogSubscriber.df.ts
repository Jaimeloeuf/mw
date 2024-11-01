import { apiDB } from "../../kysely/index.js";

export function getAllBlogSubscriber() {
  return apiDB.selectFrom("blog_subscriber").selectAll().execute();
}
