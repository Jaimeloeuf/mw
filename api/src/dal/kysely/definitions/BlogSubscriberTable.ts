import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
  UpdatedAtColumnType,
} from "./types/index.js";

export interface BlogSubscriberTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;
  created_at: CreatedAtColumnType;
  updated_at: UpdatedAtColumnType;

  /**
   * Blog ID. This cannot be updated.
   */
  blog_id: NonUpdatableIdColumnType;

  /**
   * Subscriber's email
   */
  email: ColumnType<string>;
}

export type BlogSubscriber = Selectable<BlogSubscriberTable>;
export type CreateBlogSubscriber = Insertable<BlogSubscriberTable>;
export type UpdateBlogSubscriber = Updateable<BlogSubscriberTable>;
