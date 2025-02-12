import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface BucketlistItemTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when bucketlist is created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * ID of the bucketlist this bucketlist item belongs to
   */
  bucketlist_id: ColumnType<string>;

  /**
   * Name of the bucketlist item
   */
  name: ColumnType<string>;

  /**
   * Whether this bucketlist item is completed
   */
  done: ColumnType<boolean>;
}

export type BucketlistItem = Selectable<BucketlistItemTable>;
export type CreateBucketlistItem = Insertable<BucketlistItemTable>;
export type UpdateBucketlistItem = Updateable<BucketlistItemTable>;
