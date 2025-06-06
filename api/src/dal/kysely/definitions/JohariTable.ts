import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
  UpdatedAtColumnType,
} from "./types/index.js";

export interface JohariTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;
  created_at: CreatedAtColumnType;
  updated_at: UpdatedAtColumnType;

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
