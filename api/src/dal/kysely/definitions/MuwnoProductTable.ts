import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
} from "./types/index.js";

export interface MuwnoProductTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;

  /**
   * Track when was the Product created
   */
  created_at: CreatedAtColumnType;

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
  link: $Nullable<string>;

  /**
   * Product's description
   */
  description: string;
}

export type MuwnoProduct = Selectable<MuwnoProductTable>;
export type CreateMuwnoProduct = Insertable<MuwnoProductTable>;
export type UpdateMuwnoProduct = Updateable<MuwnoProductTable>;
