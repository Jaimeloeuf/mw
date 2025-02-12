import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface BucketlistTable {
  /**
   * Unique opaque ID that cannot be updated
   */
  id: ColumnType<string, string, never>;

  /**
   * Track when bucketlist is created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * Name of the bucketlist
   */
  name: ColumnType<string>;

  /**
   * Description of the bucketlist
   */
  description: ColumnType<string>;
}

export type Bucketlist = Selectable<BucketlistTable>;
export type CreateBucketlist = Insertable<BucketlistTable>;
export type UpdateBucketlist = Updateable<BucketlistTable>;
