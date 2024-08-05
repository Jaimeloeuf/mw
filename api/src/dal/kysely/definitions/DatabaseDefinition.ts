import type { BlogSubscriberTable } from "./BlogSubscriberTable.js";
import type { BucketlistTable } from "./BucketlistTable.js";
import type { BucketlistItemTable } from "./BucketlistItemTable.js";

export interface Database {
  blog_subscriber: BlogSubscriberTable;
  bucketlist: BucketlistTable;
  bucketlist_item: BucketlistItemTable;
}
