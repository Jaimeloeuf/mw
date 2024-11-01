import { apiDB } from "../../kysely/index.js";
import type { BlogSubscriber } from "../../kysely/index.js";

export async function isEmailAlreadySubscribed(email: BlogSubscriber["email"]) {
  const subscriber = await apiDB
    .selectFrom("blog_subscriber")
    .where("email", "=", email)
    .select("id")
    .executeTakeFirst();

  return subscriber !== undefined;
}
