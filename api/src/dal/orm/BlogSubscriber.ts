import { apiDB } from "../kysely/index.js";
import { BaseEnt, EntCrudOperator } from "./Orm.js";

export class BlogSubscriber extends BaseEnt {
  constructor(
    public data: {
      id: string;
      createdAt: Date;
      email: string;
    },
  ) {
    super();
  }

  jsonSerialise(): string {
    return JSON.stringify(this.data);
  }

  static override jsonParse(jsonString: string): BlogSubscriber {
    return new BlogSubscriber(JSON.parse(jsonString));
  }
}

export const BlogSubscriberOperators = {
  async create(ent) {
    await apiDB
      .insertInto("blog_subscriber")
      .values(ent.data)
      .returningAll()
      .executeTakeFirstOrThrow();
  },

  async get(id) {
    const data = await apiDB
      .selectFrom("blog_subscriber")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new BlogSubscriber({
      id: data.id,
      createdAt: data.created_at,
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
} satisfies EntCrudOperator<BlogSubscriber>;
