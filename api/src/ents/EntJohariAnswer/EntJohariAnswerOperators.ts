import { apiDB } from "../../dal/kysely/index.js";
import { defineEntOperators } from "../../ent/index.js";
import { EntJohariAnswer } from "./EntJohariAnswer.js";

export const EntJohariAnswerOperators = defineEntOperators(EntJohariAnswer, {
  CRUD: {
    async create(ent) {
      await apiDB
        .insertInto("johari_answer")
        .values({
          id: ent.data.id,
          created_at: ent.data.createdAt.toISOString(),
          updated_at: ent.data.updatedAt.toISOString(),
          johari_id: ent.data.johariID,
          name: ent.data.name,
          words: ent.data.words,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    },

    async get(id) {
      const data = await apiDB
        .selectFrom("johari_answer")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();

      return new EntJohariAnswer({
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        johariID: data.johari_id,
        name: data.name,
        words: data.words,
      });
    },

    async update(ent) {
      await apiDB
        .updateTable("johari_answer")
        .where("id", "=", ent.data.id)
        .set({
          updated_at: ent.data.updatedAt.toISOString(),
          johari_id: ent.data.johariID,
          name: ent.data.name,
          words: ent.data.words,
        })
        .execute();
    },

    async delete(id) {
      await apiDB
        .deleteFrom("johari_answer")
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
    },
  },

  custom: {
    async getAllAnswersForJohari(johariID: string) {
      const data = await apiDB
        .selectFrom("johari_answer")
        .selectAll()
        .where("johari_id", "=", johariID)
        .orderBy("created_at", "desc")
        .execute();

      return data.map(
        (data) =>
          new EntJohariAnswer({
            id: data.id,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            johariID: data.johari_id,
            name: data.name,
            words: data.words,
          }),
      );
    },
  },
});
