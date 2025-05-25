import type { ColumnType } from "kysely";

/**
 * CreatedAt column type uses the global `$DateTime.ISO.DateTime.Strong` type.
 * Note that this column cannot be updated once set.
 *
 * The underlying `pg` library is configured to use the
 * `$DateTime.ISO.DateTime.makeStrongAndThrowOnError` parser/validator when
 * reading string values from the postgres DB.
 */
export type CreatedAtColumnType = ColumnType<
  $DateTime.ISO.DateTime.Strong,
  $DateTime.ISO.DateTime.Strong,
  never
>;
