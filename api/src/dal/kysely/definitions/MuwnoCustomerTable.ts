import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface MuwnoCustomerTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the Customer created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * Track when was the Customer imported into muwno
   */
  imported_at: ColumnType<Date, string, never>;

  /**
   * What Org does this customer belong to?
   */
  org_id: string;

  /**
   * Customer's ID within the Org's own system, for our user's to integrate
   * their systems with ours.
   */
  cid: string;

  /**
   * Customer's name
   */
  name: null | string;

  /**
   * Customer's email
   */
  email: null | string;

  /**
   * Customer's phone
   */
  phone: null | string;
}

export type MuwnoCustomer = Selectable<MuwnoCustomerTable>;
export type CreateMuwnoCustomer = Insertable<MuwnoCustomerTable>;
export type UpdateMuwnoCustomer = Updateable<MuwnoCustomerTable>;
