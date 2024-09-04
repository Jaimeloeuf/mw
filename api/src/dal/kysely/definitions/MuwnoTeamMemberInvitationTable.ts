import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface MuwnoTeamMemberInvitationTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the invitation created
   */
  created_at: ColumnType<Date, string | undefined, never>;

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
