import { db } from "../../kysely/index.js";

export async function isEmailAlreadySubscribed(email: string) {
  const subscriber = await db
    .selectFrom("blog_subscriber")
    .where("email", "=", email)
    .select("id")
    .executeTakeFirst();

  return subscriber !== undefined;
}
