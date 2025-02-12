import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface MuwnoTaskTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the Task created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * The task's Product ID
   */
  product_id: string;

  /**
   * The task's corresponding PMF Survey Response ID
   */
  pmf_survey_response_id: string;

  /**
   * Score for the task
   */
  score: number;

  /**
   * The Task itself
   */
  task: string;

  /**
   * Is the Task done?
   */
  done: boolean;
}

export type MuwnoTask = Selectable<MuwnoTaskTable>;
export type CreateMuwnoTask = Insertable<MuwnoTaskTable>;
export type UpdateMuwnoTask = Updateable<MuwnoTaskTable>;
