import { apiDB } from "../../kysely/index.js";
import type {
  MuwnoStripeCustomer,
  UpdateMuwnoStripeCustomer,
} from "../../kysely/index.js";

export async function updateStripeCustomerMeteredProductSubscription(
  stripeCustomerID: MuwnoStripeCustomer["stripe_customer_id"],
  meteredSubscriptionID: UpdateMuwnoStripeCustomer["metered_subscription_id"],
) {
  await apiDB
    .updateTable("muwno_stripe_customer")
    .set({
      metered_subscription_id: meteredSubscriptionID,
    })
    .where("stripe_customer_id", "=", stripeCustomerID)
    .executeTakeFirstOrThrow();
}
