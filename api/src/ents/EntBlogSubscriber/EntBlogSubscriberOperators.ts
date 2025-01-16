import { apiDB } from "../../dal/kysely/index.js";
import { defineEntOperators } from "../../ent/index.js";
import { EntBlogSubscriber } from "./EntBlogSubscriber.js";

export const EntBlogSubscriberOperators = defineEntOperators(
  EntBlogSubscriber,
  {
    CRUD: {
      async create(ent) {
        await apiDB
          .insertInto("blog_subscriber")
          .values({
            id: ent.data.id,
            created_at: ent.data.createdAt.toISOString(),
            updated_at: ent.data.updatedAt.toISOString(),
            email: ent.data.email,
          })
          .returningAll()
          .executeTakeFirstOrThrow();
      },

      async get(id) {
        const data = await apiDB
          .selectFrom("blog_subscriber")
          .selectAll()
          .where("id", "=", id)
          .executeTakeFirstOrThrow();

        return new EntBlogSubscriber({
          id: data.id,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          email: data.email,
        });
      },

      async update(ent) {
        await apiDB
          .updateTable("blog_subscriber")
          .where("id", "=", ent.data.id)
          .set({
            updated_at: ent.data.updatedAt.toISOString(),
            email: ent.data.email,
          })
          .execute();
      },

      async delete(id) {
        await apiDB
          .deleteFrom("blog_subscriber")
          .where("id", "=", id)
          .returningAll()
          .executeTakeFirst();
      },
    },

    custom: {
      async getAll() {
        const data = await apiDB
          .selectFrom("blog_subscriber")
          .selectAll()
          .execute();

        return data.map(
          (data) =>
            new EntBlogSubscriber({
              id: data.id,
              createdAt: data.created_at,
              updatedAt: data.updated_at,
              email: data.email,
            }),
        );
      },

      async isEmailAlreadySubscribed(email: string) {
        const subscriber = await apiDB
          .selectFrom("blog_subscriber")
          .where("email", "=", email)
          .select("id")
          .executeTakeFirst();

        return subscriber !== undefined;
      },
    },
  },
);
