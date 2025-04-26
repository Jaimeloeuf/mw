import { apiDB } from "../../dal/kysely/index.js";
import { defineEntOperators } from "../../ent/index.js";
import { EntJohari } from "./EntJohari.js";

export const EntJohariOperators = defineEntOperators(EntJohari, {
  CRUD: {
    async create(ent) {
      await apiDB
        .insertInto("johari")
        .values({
          id: ent.data.id,
          created_at: ent.data.createdAt.toISOString(),
          updated_at: ent.data.updatedAt.toISOString(),
          name: ent.data.name,
          words: ent.data.words,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    },

    async get(id) {
      const data = await apiDB
        .selectFrom("johari")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();

      return new EntJohari({
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        name: data.name,
        words: data.words,
      });
    },

    async getMany(ids) {
      const data = await apiDB
        .selectFrom("johari")
        .selectAll()
        .where("id", "in", ids)
        .execute();

      return data.map(
        (data) =>
          new EntJohari({
            id: data.id,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            name: data.name,
            words: data.words,
          }),
      );
    },

    async update(ent) {
      await apiDB
        .updateTable("johari")
        .where("id", "=", ent.data.id)
        .set({
          updated_at: ent.data.updatedAt.toISOString(),
          name: ent.data.name,
          words: ent.data.words,
        })
        .execute();
    },

    async delete(id) {
      await apiDB
        .deleteFrom("johari")
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
    },
  },

  custom: {},
});
