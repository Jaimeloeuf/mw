import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
} from "./types/index.js";

export interface MuwnoPmfSurveyResponseTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;

  /**
   * Track when was the survey response recorded
   */
  created_at: CreatedAtColumnType;

  /**
   * The survey's Product ID.
   */
  product_id: string;

  /**
   * Answer to Question 1
   */
  a1: 1 | 2 | 3;

  /**
   * Answer to Question 2
   */
  a2: string;

  /**
   * Answer to Question 3
   */
  a3: string;

  /**
   * Answer to Question 4
   */
  a4: string;
}

export type MuwnoPmfSurveyResponse = Selectable<MuwnoPmfSurveyResponseTable>;
export type CreateMuwnoPmfSurveyResponse =
  Insertable<MuwnoPmfSurveyResponseTable>;
export type UpdateMuwnoPmfSurveyResponse =
  Updateable<MuwnoPmfSurveyResponseTable>;
