import type { Generated, Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
} from "./types/index.js";

export interface MuwnoUserTable {
  /**
   * Auto incrementing int ID to allow for stable sorting.
   */
  iid: Generated<number>;

  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;

  /**
   * Track when was the User created
   */
  created_at: CreatedAtColumnType;

  /**
   * The user's Org ID.
   * This is optional because a user does not have an org when first created.
   */
  org_id: $Nullable<string>;

  /**
   * User's RBAC role.
   * This is optional until user joins an org and gets assigned a role.
   */
  role: $Nullable<"OrgUser" | "OrgAdmin" | "OrgOwner">;

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

export type MuwnoUser = Selectable<MuwnoUserTable>;
export type CreateMuwnoUser = Insertable<MuwnoUserTable>;
export type UpdateMuwnoUser = Updateable<MuwnoUserTable>;
