import type { BlogSubscriberTable } from "./BlogSubscriberTable.js";
import type { BucketlistTable } from "./BucketlistTable.js";
import type { BucketlistItemTable } from "./BucketlistItemTable.js";
import type { MuwnoOrgTable } from "./MuwnoOrgTable.js";
import type { MuwnoUserTable } from "./MuwnoUserTable.js";
import type { MuwnoProductTable } from "./MuwnoProductTable.js";
import type { MuwnoPmfSurveyResponseTable } from "./MuwnoPmfSurveyResponseTable.js";

export interface Database {
  blog_subscriber: BlogSubscriberTable;
  bucketlist: BucketlistTable;
  bucketlist_item: BucketlistItemTable;
  muwno_org: MuwnoOrgTable;
  muwno_user: MuwnoUserTable;
  muwno_product: MuwnoProductTable;
  muwno_pmf_survey_response: MuwnoPmfSurveyResponseTable;
}
