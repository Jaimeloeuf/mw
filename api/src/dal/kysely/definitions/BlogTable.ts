import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface BlogTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string, string>;

  /**
   * Blog name.
   */
  name: ColumnType<string>;

  /**
   * Owner's email.
   */
  owner_email: ColumnType<string>;
}

export type Blog = Selectable<BlogTable>;
export type CreateBlog = Insertable<BlogTable>;
export type UpdateBlog = Updateable<BlogTable>;
