import type { ColumnType } from "kysely";

/**
 * Nullable DateTime column type uses the global `$DateTime.ISO.DateTime.Strong`
 * type.
 *
 * The underlying `pg` library is configured to use the
 * `$DateTime.ISO.DateTime.makeStrongAndThrowOnError` parser/validator when
 * reading string values from the postgres DB.
 */
export type NullableDateTimeColumnType = ColumnType<
  $Nullable<$DateTime.ISO.DateTime.Strong>,
  $NullableAndOptional<$DateTime.ISO.DateTime.Strong>,
  $NullableAndOptional<$DateTime.ISO.DateTime.Strong>
>;
