import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { CreatedAtColumnType } from "./types/index.js";

/**
 * Table to store the mapping of Question --(1 to many)--> Tags
 */
export interface LeetcodeQuesTagTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was this created
   */
  created_at: CreatedAtColumnType;

  /**
   * The LeetcodeQues ID
   */
  ques_id: string;

  /**
   * The LeetcodeTag ID
   */
  tag_id: string;
}

export type LeetcodeQuesTag = Selectable<LeetcodeQuesTagTable>;
export type CreateLeetcodeQuesTag = Insertable<LeetcodeQuesTagTable>;
export type UpdateLeetcodeQuesTag = Updateable<LeetcodeQuesTagTable>;
