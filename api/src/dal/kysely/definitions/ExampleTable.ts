import type { Insertable, Selectable, Updateable } from "kysely";

import type {
  NonUpdatableIdColumnType,
  CreatedAtColumnType,
  UpdatedAtColumnType,
} from "./types/index.js";

export interface ExampleTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: NonUpdatableIdColumnType;
  created_at: CreatedAtColumnType;
  updated_at: UpdatedAtColumnType;

  /**
   * @todo Your columns
   */
  name: string;
}

export type Example = Selectable<ExampleTable>;
export type CreateExample = Insertable<ExampleTable>;
export type UpdateExample = Updateable<ExampleTable>;
