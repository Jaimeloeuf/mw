import { apiDB } from "../../kysely/index.js";

export async function isEmailAlreadySubscribed(email: string) {
  const subscriber = await apiDB
    .selectFrom("blog_subscriber")
    .where("email", "=", email)
    .select("id")
    .executeTakeFirst();

  return subscriber !== undefined;
}
