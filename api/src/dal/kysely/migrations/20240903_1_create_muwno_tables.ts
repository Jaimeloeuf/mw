import type { Kysely } from "kysely";

const orgTableName = "muwno_org";
const userTableName = "muwno_user";
const productTableName = "muwno_product";
const pmfSurveyResponseTableName = "muwno_pmf_survey_response";
const taskTableName = "muwno_task";
const teamMemberInvitationTableName = "muwno_team_member_invitation";
const customerTableName = "muwno_customer";
const stripeWebhookEventTableName = "muwno_stripe_webhook_event";
const stripeCustomerTableName = "muwno_stripe_customer";
const stripeSetupNextTableName = "muwno_stripe_setup_next";
const apiKeyTableName = "muwno_api_key";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(orgTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("phone", "text", (col) => col.notNull())
    .addColumn("address", "text")
    .addColumn("size", "text")
    .addColumn("verified", "boolean", (col) => col.notNull())
    .addColumn("subscribed", "boolean", (col) => col.notNull())
    .addColumn("subscription_plan", "text")
    .execute();

  await db.schema
    .createTable(userTableName)
    .addColumn("iid", "serial", (col) => col.primaryKey())
    .addColumn("id", "text", (col) => col.notNull().unique())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("org_id", "text")
    .addColumn("role", "text")
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull().unique())
    .addColumn("deactivated", "boolean", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(productTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("link", "text")
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("org_id", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(pmfSurveyResponseTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("product_id", "text", (col) => col.notNull())
    .addColumn("a1", "int2", (col) => col.notNull())
    .addColumn("a2", "text", (col) => col.notNull())
    .addColumn("a3", "text", (col) => col.notNull())
    .addColumn("a4", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(taskTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("product_id", "text", (col) => col.notNull())
    .addColumn("pmf_survey_response_id", "text", (col) => col.notNull())
    .addColumn("score", "int2", (col) => col.notNull())
    .addColumn("task", "text", (col) => col.notNull())
    .addColumn("done", "boolean", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(teamMemberInvitationTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("org_id", "text", (col) => col.notNull())
    .addColumn("inviter_user_id", "text", (col) => col.notNull())
    .addColumn("invitee_email", "text", (col) => col.notNull().unique())
    .addColumn("role", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(customerTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("imported_at", "timestamp", (col) => col.notNull())
    .addColumn("org_id", "text", (col) => col.notNull())
    .addColumn("cid", "text", (col) => col.notNull())
    .addUniqueConstraint("cid is unique within an Org", ["org_id", "cid"])
    .addColumn("name", "text")
    .addColumn("email", "text")
    .addColumn("phone", "text")
    .execute();

  await db.schema
    .createTable(stripeWebhookEventTableName)
    .addColumn("stripe_event_id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("livemode", "boolean", (col) => col.notNull())
    .addColumn("processed", "boolean", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(stripeCustomerTableName)
    .addColumn("stripe_customer_id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("org_id", "text", (col) => col.notNull().unique())
    .addColumn("metered_subscription_id", "text")
    .execute();

  await db.schema
    .createTable(stripeSetupNextTableName)
    .addColumn("stripe_setup_intent_id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("next", "json", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(apiKeyTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("org_id", "text", (col) => col.notNull())
    .addColumn("hash", "text", (col) => col.notNull().unique())
    .addColumn("prefix", "text", (col) => col.notNull())
    .addColumn("created_by", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(orgTableName).execute();
  await db.schema.dropTable(userTableName).execute();
  await db.schema.dropTable(productTableName).execute();
  await db.schema.dropTable(pmfSurveyResponseTableName).execute();
  await db.schema.dropTable(taskTableName).execute();
  await db.schema.dropTable(teamMemberInvitationTableName).execute();
  await db.schema.dropTable(customerTableName).execute();
  await db.schema.dropTable(stripeWebhookEventTableName).execute();
  await db.schema.dropTable(stripeCustomerTableName).execute();
  await db.schema.dropTable(stripeSetupNextTableName).execute();
  await db.schema.dropTable(apiKeyTableName).execute();
}
