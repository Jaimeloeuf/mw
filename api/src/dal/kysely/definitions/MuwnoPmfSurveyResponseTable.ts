import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface MuwnoPmfSurveyResponseTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the survey response recorded
   */
  created_at: ColumnType<Date, string, never>;

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
