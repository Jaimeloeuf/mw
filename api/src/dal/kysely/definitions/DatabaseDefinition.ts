import type { AssocTable } from "./AssocTable.js";
import type { AsyncJobTable } from "./AsyncJobTable.js";
import type { BlogSubscriberTable } from "./BlogSubscriberTable.js";
import type { BlogTable } from "./BlogTable.js";
import type { BucketlistItemTable } from "./BucketlistItemTable.js";
import type { BucketlistTable } from "./BucketlistTable.js";
import type { JohariAnswerTable } from "./JohariAnswerTable.js";
import type { JohariTable } from "./JohariTable.js";
import type { LeetcodeQuesTable } from "./LeetcodeQuesTable.js";
import type { LeetcodeQuesTagTable } from "./LeetcodeQuesTagTable.js";
import type { LeetcodeTagTable } from "./LeetcodeTagTable.js";
import type { MuwnoApiKeyTable } from "./MuwnoApiKeyTable.js";
import type { MuwnoCustomerTable } from "./MuwnoCustomerTable.js";
import type { MuwnoOrgTable } from "./MuwnoOrgTable.js";
import type { MuwnoPmfSurveyResponseTable } from "./MuwnoPmfSurveyResponseTable.js";
import type { MuwnoProductTable } from "./MuwnoProductTable.js";
import type { MuwnoStripeCustomerTable } from "./MuwnoStripeCustomerTable.js";
import type { MuwnoStripeSetupNextTable } from "./MuwnoStripeSetupNextTable.js";
import type { MuwnoStripeWebhookEventTable } from "./MuwnoStripeWebhookEventTable.js";
import type { MuwnoTaskTable } from "./MuwnoTaskTable.js";
import type { MuwnoTeamMemberInvitationTable } from "./MuwnoTeamMemberInvitationTable.js";
import type { MuwnoUserTable } from "./MuwnoUserTable.js";

export interface Database {
  assoc: AssocTable;
  async_job: AsyncJobTable;
  blog_subscriber: BlogSubscriberTable;
  blog: BlogTable;
  bucketlist: BucketlistTable;
  johari_answer: JohariAnswerTable;
  johari: JohariTable;
  bucketlist_item: BucketlistItemTable;
  leetcode_ques: LeetcodeQuesTable;
  leetcode_ques_tag: LeetcodeQuesTagTable;
  leetcode_tag: LeetcodeTagTable;
  muwno_org: MuwnoOrgTable;
  muwno_user: MuwnoUserTable;
  muwno_product: MuwnoProductTable;
  muwno_pmf_survey_response: MuwnoPmfSurveyResponseTable;
  muwno_task: MuwnoTaskTable;
  muwno_team_member_invitation: MuwnoTeamMemberInvitationTable;
  muwno_customer: MuwnoCustomerTable;
  muwno_stripe_webhook_event: MuwnoStripeWebhookEventTable;
  muwno_stripe_customer: MuwnoStripeCustomerTable;
  muwno_stripe_setup_next: MuwnoStripeSetupNextTable;
  muwno_api_key: MuwnoApiKeyTable;
}
