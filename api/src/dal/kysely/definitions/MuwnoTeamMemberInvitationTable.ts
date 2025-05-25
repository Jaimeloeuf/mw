import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
} from "./types/index.js";

export interface MuwnoTeamMemberInvitationTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;

  /**
   * Track when was the invitation created
   */
  created_at: CreatedAtColumnType;

  /**
   * Org ID that the user is being invited to join
   */
  org_id: string;

  /**
   * Who invited the user
   */
  inviter_user_id: string;

  /**
   * The invitee's email
   */
  invitee_email: string;

  /**
   * User's RBAC role.
   */
  role: "OrgUser" | "OrgAdmin" | "OrgOwner";
}

export type MuwnoTeamMemberInvitation =
  Selectable<MuwnoTeamMemberInvitationTable>;
export type CreateMuwnoTeamMemberInvitation =
  Insertable<MuwnoTeamMemberInvitationTable>;
export type UpdateMuwnoTeamMemberInvitation =
  Updateable<MuwnoTeamMemberInvitationTable>;
