import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface BlogSubscriberTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when did the subscriber subscribe
   */
  created_at: ColumnType<Date, string | undefined, never>;

  /**
   * Unique subscriber's email
   */
  email: ColumnType<string>;
}

export type BlogSubscriber = Selectable<BlogSubscriberTable>;
export type NewBlogSubscriber = Insertable<BlogSubscriberTable>;
export type BlogSubscriberUpdate = Updateable<BlogSubscriberTable>;
