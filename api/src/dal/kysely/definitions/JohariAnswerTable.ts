import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface JohariAnswerTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;

  /**
   * ID of the Johari this answer is for
   */
  johari_id: string;

  /**
   * Name of the user that answered
   */
  name: string;

  /**
   * Words that the user selected
   */
  words: string;
}

export type JohariAnswer = Selectable<JohariAnswerTable>;
export type CreateJohariAnswer = Insertable<JohariAnswerTable>;
export type UpdateJohariAnswer = Updateable<JohariAnswerTable>;
