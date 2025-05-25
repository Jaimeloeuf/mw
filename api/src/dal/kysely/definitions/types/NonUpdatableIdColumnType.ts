import type { ColumnType } from "kysely";

/**
 * NonUpdatableId column type uses `string` type which most universal IDs
 * should be. Note that this column cannot be updated once set.
 */
export type NonUpdatableIdColumnType = ColumnType<string, string, never>;
