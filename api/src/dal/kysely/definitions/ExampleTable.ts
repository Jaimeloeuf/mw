import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface ExampleTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;

  /**
   * @todo Your columns
   */
  name: string;
}

export type Example = Selectable<ExampleTable>;
export type CreateExample = Insertable<ExampleTable>;
export type UpdateExample = Updateable<ExampleTable>;
