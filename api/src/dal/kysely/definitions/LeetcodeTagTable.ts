import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface LeetcodeTagTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was this created
   */
  created_at: ColumnType<Date, string | undefined, never>;

  /**
   * The unique Tag name
   */
  tag: string;
}

export type LeetcodeTag = Selectable<LeetcodeTagTable>;
export type CreateLeetcodeTag = Insertable<LeetcodeTagTable>;
export type UpdateLeetcodeTag = Updateable<LeetcodeTagTable>;
