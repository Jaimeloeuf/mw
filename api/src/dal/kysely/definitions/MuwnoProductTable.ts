import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface MuwnoProductTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the Product created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * The product's Org ID.
   */
  org_id: string;

  /**
   * Product's name
   */
  name: string;

  /**
   * Optional link to the customer's product page
   */
  link: null | string;

  /**
   * Product's description
   */
  description: string;
}

export type MuwnoProduct = Selectable<MuwnoProductTable>;
export type CreateMuwnoProduct = Insertable<MuwnoProductTable>;
export type UpdateMuwnoProduct = Updateable<MuwnoProductTable>;
