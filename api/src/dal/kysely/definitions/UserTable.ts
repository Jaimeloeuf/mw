import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface UserTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;

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
