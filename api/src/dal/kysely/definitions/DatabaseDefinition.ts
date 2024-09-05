import type { BlogSubscriberTable } from "./BlogSubscriberTable.js";
import type { BucketlistTable } from "./BucketlistTable.js";
import type { BucketlistItemTable } from "./BucketlistItemTable.js";
import type { MuwnoOrgTable } from "./MuwnoOrgTable.js";
import type { MuwnoUserTable } from "./MuwnoUserTable.js";
import type { MuwnoProductTable } from "./MuwnoProductTable.js";
import type { MuwnoPmfSurveyResponseTable } from "./MuwnoPmfSurveyResponseTable.js";
import type { MuwnoTaskTable } from "./MuwnoTaskTable.js";
import type { MuwnoTeamMemberInvitationTable } from "./MuwnoTeamMemberInvitationTable.js";
import type { MuwnoCustomerTable } from "./MuwnoCustomerTable.js";
import type { MuwnoStripeWebhookEventTable } from "./MuwnoStripeWebhookEventTable.js";

export interface Database {
  blog_subscriber: BlogSubscriberTable;
  bucketlist: BucketlistTable;
  bucketlist_item: BucketlistItemTable;
  muwno_org: MuwnoOrgTable;
  muwno_user: MuwnoUserTable;
  muwno_product: MuwnoProductTable;
  muwno_pmf_survey_response: MuwnoPmfSurveyResponseTable;
  muwno_task: MuwnoTaskTable;
  muwno_team_member_invitation: MuwnoTeamMemberInvitationTable;
  muwno_customer: MuwnoCustomerTable;
  muwno_stripe_webhook_event: MuwnoStripeWebhookEventTable;
}
