import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface LeetcodeQuesTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was this created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * The full unique URL to the question
   */
  url: string;
}

export type LeetcodeQues = Selectable<LeetcodeQuesTable>;
export type CreateLeetcodeQues = Insertable<LeetcodeQuesTable>;
export type UpdateLeetcodeQues = Updateable<LeetcodeQuesTable>;
