import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface BlogSubscriberTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string, string>;

  /**
   * Subscriber's email
   */
  email: ColumnType<string>;
}

export type BlogSubscriber = Selectable<BlogSubscriberTable>;
export type CreateBlogSubscriber = Insertable<BlogSubscriberTable>;
export type UpdateBlogSubscriber = Updateable<BlogSubscriberTable>;
