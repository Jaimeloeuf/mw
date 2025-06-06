import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
  UpdatedAtColumnType,
} from "./types/index.js";

export interface UserTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;
  created_at: CreatedAtColumnType;
  updated_at: UpdatedAtColumnType;

  /**
   * User's name
   */
  name: string;

  /**
   * User's email
   */
  email: string;

  /**
   * Is the user's account deactivated?
   */
  deactivated: boolean;
}

export type User = Selectable<UserTable>;
export type CreateUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
