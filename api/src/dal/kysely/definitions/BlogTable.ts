import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type {
  CreatedAtColumnType,
  UpdatedAtColumnType,
} from "./types/index.js";

export interface BlogTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;
  created_at: CreatedAtColumnType;
  updated_at: UpdatedAtColumnType;

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
