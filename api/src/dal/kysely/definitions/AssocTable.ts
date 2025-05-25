import type { ColumnType, Insertable, Selectable } from "kysely";

import type { CreatedAtColumnType } from "./types/index.js";

/**
 * The rows in this table is never updated, rows will only be added or deleted.
 */
export interface AssocTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the Assoc created
   */
  created_at: CreatedAtColumnType;

  /**
   * The Assoc type
   */
  type: string;

  /**
   * ID of the Ent the assoc edge starts from
   */
  from: string;

  /**
   * ID of the Ent the assoc edge points to
   */
  to: string;
}

export type Assoc = Selectable<AssocTable>;
export type CreateAssoc = Insertable<AssocTable>;
