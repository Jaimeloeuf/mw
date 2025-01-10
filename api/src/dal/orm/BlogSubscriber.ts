import { apiDB } from "../kysely/index.js";
import { BaseEnt, defineEntCrudOperator } from "./Orm.js";

type BlogSubsciberData = {
  email: string;
};

export class EntBlogSubscriber extends BaseEnt<BlogSubsciberData> {
  constructor(
    public data: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
    },
  ) {
    super();
  }

  jsonSerialise(): string {
    return JSON.stringify(this.data);
  }

  static override jsonParse(jsonString: string): EntBlogSubscriber {
    return new EntBlogSubscriber(JSON.parse(jsonString));
  }
}

export const BlogSubscriberOperators = defineEntCrudOperator<
  EntBlogSubscriber,
  typeof EntBlogSubscriber
>(EntBlogSubscriber, {
  async create(ent) {
    await apiDB
      .insertInto("blog_subscriber")
      .values({
        id: ent.data.id,
        email: ent.data.email,
        created_at: ent.data.createdAt.toISOString(),
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
      updatedAt: data.created_at,
      email: data.email,
    });
  },

  async update(ent) {
    await apiDB
      .updateTable("blog_subscriber")
      .where("id", "=", ent.data.id)
      .set(ent.data)
      .execute();
  },

  async delete(id) {
    await apiDB
      .deleteFrom("blog_subscriber")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  },
});
