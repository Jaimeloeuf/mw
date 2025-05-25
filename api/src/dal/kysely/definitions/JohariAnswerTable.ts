import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
  UpdatedAtColumnType,
} from "./types/index.js";

export interface JohariAnswerTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;
  created_at: CreatedAtColumnType;
  updated_at: UpdatedAtColumnType;

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
