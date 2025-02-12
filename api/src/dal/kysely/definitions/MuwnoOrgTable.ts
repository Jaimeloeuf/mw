import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface MuwnoOrgTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the Org created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * Name of the Org
   */
  name: string;

  /**
   * Main administrative email for the Org
   */
  email: string;

  /**
   * Phone number stored as string to accomodate all types of numbers
   */
  phone: string;

  /**
   * Arbitrary string for address
   */
  address: null | string;

  /**
   * Arbitrary string for Org size
   */
  size: null | string;

  /**
   * Did the Org pass manual human verification by the muwno team?
   */
  verified: boolean;

  /**
   * Is the Org a subscribed paying customer?
   */
  subscribed: boolean;

  /**
   * The Org's subscription plan.
   * This is optional as Orgs are created before they pay for a plan.
   */
  subscription_plan: null | "Standard";
}

export type MuwnoOrg = Selectable<MuwnoOrgTable>;
export type CreateMuwnoOrg = Insertable<MuwnoOrgTable>;
export type UpdateMuwnoOrg = Updateable<MuwnoOrgTable>;
