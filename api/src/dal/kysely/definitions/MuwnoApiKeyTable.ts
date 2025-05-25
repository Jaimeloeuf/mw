import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { CreatedAtColumnType } from "./types/index.js";

export interface MuwnoApiKeyTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when was the API Key created
   */
  created_at: CreatedAtColumnType;

  /**
   * What Org does this API Key belong to?
   */
  org_id: string;

  /**
   * The unique hash of the API key.
   * Uses a hash to prevent direct access on lost of all keys on leak.
   */
  hash: string;

  /**
   * The API Key prefix.
   */
  prefix: string;

  /**
   * Who created the API Key.
   */
  created_by: string;

  /**
   * Optional description for the API key.
   */
  description: $Nullable<string>;
}

export type MuwnoApiKey = Selectable<MuwnoApiKeyTable>;
export type CreateMuwnoApiKey = Insertable<MuwnoApiKeyTable>;
export type UpdateMuwnoApiKey = Updateable<MuwnoApiKeyTable>;
