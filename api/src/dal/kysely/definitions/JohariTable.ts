import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface JohariTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;

  /**
   * Name of the user this Johari belongs to
   */
  name: string;

  /**
   * Words that the user selected for themselves
   */
  words: string;
}

export type Johari = Selectable<JohariTable>;
export type CreateJohari = Insertable<JohariTable>;
export type UpdateJohari = Updateable<JohariTable>;
