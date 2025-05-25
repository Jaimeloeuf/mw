import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
} from "./types/index.js";

export interface LeetcodeQuesTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;

  /**
   * Track when was this created
   */
  created_at: CreatedAtColumnType;

  /**
   * The full unique URL to the question
   */
  url: string;
}

export type LeetcodeQues = Selectable<LeetcodeQuesTable>;
export type CreateLeetcodeQues = Insertable<LeetcodeQuesTable>;
export type UpdateLeetcodeQues = Updateable<LeetcodeQuesTable>;
