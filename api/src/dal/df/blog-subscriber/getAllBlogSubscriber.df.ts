import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";

export default dataFn(function getAllBlogSubscriber() {
  return apiDB.selectFrom("blog_subscriber").selectAll().execute();
});
