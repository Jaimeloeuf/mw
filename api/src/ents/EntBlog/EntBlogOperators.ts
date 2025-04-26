import { apiDB } from "../../dal/kysely/index.js";
import { defineEntOperators } from "../../ent/index.js";
import { EntBlog } from "./EntBlog.js";

export const EntBlogOperators = defineEntOperators(EntBlog, {
  CRUD: {
    async create(ent) {
      await apiDB
        .insertInto("blog")
        .values({
          id: ent.data.id,
          created_at: ent.data.createdAt.toISOString(),
          updated_at: ent.data.updatedAt.toISOString(),
          name: ent.data.name,
          owner_email: ent.data.ownerEmail,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    },

    async get(id) {
      const data = await apiDB
        .selectFrom("blog")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();

      return new EntBlog({
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        name: data.name,
        ownerEmail: data.owner_email,
      });
    },

    async getMany(ids) {
      const data = await apiDB
        .selectFrom("blog")
        .selectAll()
        .where("id", "in", ids)
        .execute();

      return data.map(
        (data) =>
          new EntBlog({
            id: data.id,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            name: data.name,
            ownerEmail: data.owner_email,
          }),
      );
    },

    async update(ent) {
      await apiDB
        .updateTable("blog")
        .where("id", "=", ent.data.id)
        .set({
          updated_at: ent.data.updatedAt.toISOString(),
          name: ent.data.name,
          owner_email: ent.data.ownerEmail,
        })
        .execute();
    },

    async delete(id) {
      await apiDB
        .deleteFrom("blog")
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
    },
  },

  custom: {},
});
