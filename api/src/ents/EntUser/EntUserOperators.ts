import { apiDB } from "../../dal/kysely/index.js";
import { defineEntOperators } from "../../ent/index.js";
import { EntUser } from "./EntUser.js";

export const EntUserOperators = defineEntOperators(EntUser, {
  CRUD: {
    async create(ent) {
      await apiDB
        .insertInto("user")
        .values({
          id: ent.data.id,
          created_at: ent.data.createdAt,
          updated_at: ent.data.updatedAt,
          name: ent.data.name,
          email: ent.data.email,
          deactivated: ent.data.deactivated,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    },

    async get(id) {
      const data = await apiDB
        .selectFrom("user")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();

      return new EntUser({
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        name: data.name,
        email: data.email,
        deactivated: data.deactivated,
      });
    },

    async getMany(ids) {
      const data = await apiDB
        .selectFrom("user")
        .selectAll()
        .where("id", "in", ids)
        .execute();

      return data.map(
        (data) =>
          new EntUser({
            id: data.id,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            name: data.name,
            email: data.email,
            deactivated: data.deactivated,
          }),
      );
    },

    async update(ent) {
      await apiDB
        .updateTable("user")
        .where("id", "=", ent.data.id)
        .set({
          updated_at: ent.data.updatedAt,
          name: ent.data.name,
          email: ent.data.email,
          deactivated: ent.data.deactivated,
        })
        .execute();
    },

    async delete(id) {
      await apiDB
        .deleteFrom("user")
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
    },
  },

  custom: {},
});
