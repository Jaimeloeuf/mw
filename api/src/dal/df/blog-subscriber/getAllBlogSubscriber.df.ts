import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(function blogSubscriberGetAllBlogSubscriber() {
  return apiDB.selectFrom("blog_subscriber").selectAll().execute();
});
