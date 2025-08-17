import type { CreateMuwnoOrg } from "../../dal/index.js";

import { df } from "../../__generated/index.js";
import { SimplePostProcessing } from "../../spp/index.js";

/**
 * Create a new Organisation, and set creator as the Org Owner.
 */
export default async function MuwnoCreateOrg(
  userID: string,
  createOrgDTO: CreateMuwnoOrg,
) {
  // Ensure no leading or trailing spaces for Org names.
  createOrgDTO.name = createOrgDTO.name.trim();
  createOrgDTO.email = createOrgDTO.email.trim().toLowerCase();

  const org = await df.muwnoCreateOrg.runAndThrowOnError(createOrgDTO);

  // Update User Entity to add Role and OrgID
  await df.muwnoUpdateUser.run(userID, {
    org_id: org.id,
    role: "OrgOwner",
  });

  // @todo
  // Set Org creator as the Org Owner
  // await this.authService.setCustomClaims(userID, { roles: [Role.OrgOwner] });

  // Create a new Stripe Customer on Org creation since every org is tied to
  // a Stripe Customer, even if it is not subscribed yet.
  // await this.stripeCustomerService.createCustomer(org);

  SimplePostProcessing(MuwnoCreateOrg.name)
    .runJobsInParallel()
    .addJob(async function updateAdminAboutNewOrgCreated() {
      // await adminNotifService.send(orgCreatedNotifBuilder(org.id, createOneOrgDTO));
    })
    .addJob(async function sendWelcomeEmail() {
      // await transactionalEmailService.email(
      //   org.email,
      //   orgCreatedEmailBuilder.subject(org.name),
      //   orgCreatedEmailBuilder.body(org.name),
      // );
    });

  return org;
}
