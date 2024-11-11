import type { BlogSubscriber } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function blogSubscriberIsEmailAlreadySubscribed(
  email: BlogSubscriber["email"],
) {
  const subscriber = await apiDB
    .selectFrom("blog_subscriber")
    .where("email", "=", email)
    .select("id")
    .executeTakeFirst();

  return subscriber !== undefined;
});
