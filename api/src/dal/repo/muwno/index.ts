import { dalWrapper } from "../dalWrapper.js";

import { getUser } from "./getUser.df.js";
import { createUser } from "./createUser.df.js";
import { updateUser } from "./updateUser.df.js";
import { deactivateUser } from "./deactivateUser.df.js";
import { isUserOnboarded } from "./isUserOnboarded.df.js";
import { canUserAccessOrg } from "./canUserAccessOrg.df.js";
import { getOrg } from "./getOrg.df.js";
import { getOrgOfUser } from "./getOrgOfUser.df.js";
import { createOrg } from "./createOrg.df.js";
import { updateOrg } from "./updateOrg.df.js";
import { getOrgMembers } from "./getOrgMembers.df.js";
import { createJoinOrgInvitation } from "./createJoinOrgInvitation.df.js";
import { getPendingJoinOrgInvitation } from "./getPendingJoinOrgInvitation.df.js";
import { getAllPendingJoinOrgInvitations } from "./getAllPendingJoinOrgInvitations.df.js";
import { getAllPendingJoinOrgInvitationsOfUser } from "./getAllPendingJoinOrgInvitationsOfUser.df.js";
import { deletePendingJoinOrgInvitation } from "./deletePendingJoinOrgInvitation.df.js";
import { removeOrgMember } from "./removeOrgMember.df.js";
import { canUserAccessProduct } from "./canUserAccessProduct.df.js";
import { getProduct } from "./getProduct.df.js";
import { getProductOrgID } from "./getProductOrgID.df.js";
import { getProductsOfUserOrg } from "./getProductsOfUserOrg.df.js";
import { createProduct } from "./createProduct.df.js";
import { updateProduct } from "./updateProduct.df.js";
import { deleteProduct } from "./deleteProduct.df.js";
import { transferProduct } from "./transferProduct.df.js";
import { getFeedbackform } from "./getFeedbackform.df.js";
import { createFeedbackResponse } from "./createFeedbackResponse.df.js";
import { getNumberOfFeedbackResponsesStoredByOrg } from "./getNumberOfFeedbackResponsesStoredByOrg.df.js";
import { getNumberOfFeedbackResponsesStoredByProduct } from "./getNumberOfFeedbackResponsesStoredByProduct.df.js";
import { getFeedbackResponse } from "./getFeedbackResponse.df.js";
import { getFeedbackResponses } from "./getFeedbackResponses.df.js";
import { getFeedbackResponseA2 } from "./getFeedbackResponseA2.df.js";
import { getFeedbackResponseA3 } from "./getFeedbackResponseA3.df.js";
import { getA3 } from "./getA3.df.js";
import { getProductIdOfFeedbackResponse } from "./getProductIdOfFeedbackResponse.df.js";
import { createTask } from "./createTask.df.js";
import { getTask } from "./getTask.df.js";
import { updateTask } from "./updateTask.df.js";
import { deleteTask } from "./deleteTask.df.js";
import { getTasksOfResponse } from "./getTasksOfResponse.df.js";
import { getTasksOfProduct } from "./getTasksOfProduct.df.js";
import { getProductIdOfTask } from "./getProductIdOfTask.df.js";
import { markTaskAsDone } from "./markTaskAsDone.df.js";
import { createCustomer } from "./createCustomer.df.js";
import { getNumberOfCustomersStoredByOrg } from "./getNumberOfCustomersStoredByOrg.df.js";
import { isStripeWebhookEventUnprocessed } from "./isStripeWebhookEventUnprocessed.df.js";
import { markStripeWebhookEventAsProcessed } from "./markStripeWebhookEventAsProcessed.df.js";
import { createStripeCustomer } from "./createStripeCustomer.df.js";
import { getStripeCustomer } from "./getStripeCustomer.df.js";
import { getStripeCustomerOfOrg } from "./getStripeCustomerOfOrg.df.js";
import { updateStripeCustomerMeteredProductSubscription } from "./updateStripeCustomerMeteredProductSubscription.df.js";
import { createStripeSetupNext } from "./createStripeSetupNext.df.js";
import { getStripeSetupNext } from "./getStripeSetupNext.df.js";
import { deleteStripeSetupNext } from "./deleteStripeSetupNext.df.js";
import { createApiKey } from "./createApiKey.df.js";
import { getApiKey } from "./getApiKey.df.js";
import { getApiKeysOfOrg } from "./getApiKeysOfOrg.df.js";
import { deleteApiKey } from "./deleteApiKey.df.js";
import { getApiKeyOrg } from "./getApiKeyOrg.df.js";

export const muwnoRepo = {
  /**
   * Get User Entity object, throws `NotFoundException` if not found.
   */
  getUser: dalWrapper(getUser),

  /**
   * Create a new User in data source
   */
  createUser: dalWrapper(createUser),

  /**
   * Update a User in data source
   */
  updateUser: dalWrapper(updateUser),

  /**
   * Deactivate a User account
   */
  deactivateUser: dalWrapper(deactivateUser),

  /**
   * Check if given user completed onboarding.
   *
   * To be considered onboarded
   * 1. User must have an Org
   * 2. The org must have a valid subscription
   */
  isUserOnboarded: dalWrapper(isUserOnboarded),

  /**
   * Check if user have access permission to this Org.
   */
  canUserAccessOrg: dalWrapper(canUserAccessOrg),

  /**
   * Get a single Org Entity object back
   */
  getOrg: dalWrapper(getOrg),

  /**
   * Get a user's Org Entity object back if they belong to an Org
   */
  getOrgOfUser: dalWrapper(getOrgOfUser),

  /**
   * Create a new Organisation in data source
   */
  createOrg: dalWrapper(createOrg),

  /**
   * Update an Organisation in data source
   */
  updateOrg: dalWrapper(updateOrg),

  /**
   * Get all members of the Org team, sorted by newest member first.
   */
  getOrgMembers: dalWrapper(getOrgMembers),

  /**
   * Create and save a team member invite into data source.
   */
  createJoinOrgInvitation: dalWrapper(createJoinOrgInvitation),

  /**
   * Get a pending team invitation using the given `invitationID`.
   */
  getPendingJoinOrgInvitation: dalWrapper(getPendingJoinOrgInvitation),

  /**
   * Get all pending team invitations of the given Org.
   */
  getAllPendingJoinOrgInvitations: dalWrapper(getAllPendingJoinOrgInvitations),

  /**
   * Get all pending team invitations of a given user.
   */
  getAllPendingJoinOrgInvitationsOfUser: dalWrapper(
    getAllPendingJoinOrgInvitationsOfUser,
  ),

  /**
   * Delete a pending team invitation.
   */
  deletePendingJoinOrgInvitation: dalWrapper(deletePendingJoinOrgInvitation),

  /**
   * Remove member from team and all their data from the team.
   */
  removeOrgMember: dalWrapper(removeOrgMember),

  /**
   * Check if user have access permission to this product.
   * If product does not exists, it is also treated as a lack of permission.
   */
  canUserAccessProduct: dalWrapper(canUserAccessProduct),

  /**
   * Get a single product the user can access.
   */
  getProduct: dalWrapper(getProduct),

  /**
   * Get a product's Org ID.
   */
  getProductOrgID: dalWrapper(getProductOrgID),

  /**
   * Get all products of the user's Org.
   */
  getProductsOfUserOrg: dalWrapper(getProductsOfUserOrg),

  /**
   * Create a new Product in data source
   */
  createProduct: dalWrapper(createProduct),

  /**
   * Update a Product
   */
  updateProduct: dalWrapper(updateProduct),

  /**
   * Delete a single product.
   */
  deleteProduct: dalWrapper(deleteProduct),

  /**
   * Transfer product to a different Org.
   */
  transferProduct: dalWrapper(transferProduct),

  /**
   * Get a feedback form object.
   */
  getFeedbackform: dalWrapper(getFeedbackform),

  /**
   * Save a feedback form response.
   */
  createFeedbackResponse: dalWrapper(createFeedbackResponse),

  /**
   * Get the number of survey responses currently stored for a given Org.
   */
  getNumberOfFeedbackResponsesStoredByOrg: dalWrapper(
    getNumberOfFeedbackResponsesStoredByOrg,
  ),

  /**
   * Get the number of survey responses currently stored for a given Product.
   */
  getNumberOfFeedbackResponsesStoredByProduct: dalWrapper(
    getNumberOfFeedbackResponsesStoredByProduct,
  ),

  /**
   * Get a single response.
   */
  getFeedbackResponse: dalWrapper(getFeedbackResponse),

  /**
   * Get survey responses of selected product, sorted by latest responses first.
   */
  getFeedbackResponses: dalWrapper(getFeedbackResponses),

  /**
   * Get feedback response data `a2` of the given productID, sorted by most
   * important and oldest first, and up to the first 1000 answers.
   */
  getFeedbackResponseA2: dalWrapper(getFeedbackResponseA2),

  /**
   * Get feedback response data `a3` of the given productID, sorted by most
   * important and oldest first, and up to the first 1000 answers.
   */
  getFeedbackResponseA3: dalWrapper(getFeedbackResponseA3),

  /**
   * Get Product's feedback response `a3`.
   * @todo Use a better name for this to not conflict with the above methods
   */
  getA3: dalWrapper(getA3),

  /**
   * Get product ID of a feedback response.
   */
  getProductIdOfFeedbackResponse: dalWrapper(getProductIdOfFeedbackResponse),

  /**
   * Create a new Task in data source.
   */
  createTask: dalWrapper(createTask),

  /**
   * Get Task from data source.
   */
  getTask: dalWrapper(getTask),

  /**
   * Update Task in data source.
   */
  updateTask: dalWrapper(updateTask),

  /**
   * Delete Task in data source.
   */
  deleteTask: dalWrapper(deleteTask),

  /**
   * Get Tasks of response from data source.
   */
  getTasksOfResponse: dalWrapper(getTasksOfResponse),

  /**
   * Get Tasks of product from data source.
   */
  getTasksOfProduct: dalWrapper(getTasksOfProduct),

  /**
   * Get `ProductID` of a given task.
   */
  getProductIdOfTask: dalWrapper(getProductIdOfTask),

  /**
   * Mark a task as done in data source.
   */
  markTaskAsDone: dalWrapper(markTaskAsDone),

  /**
   * Add a new Customer to data source.
   */
  createCustomer: dalWrapper(createCustomer),

  /**
   * Get the number of Customers currently stored by a given Org.
   */
  getNumberOfCustomersStoredByOrg: dalWrapper(getNumberOfCustomersStoredByOrg),

  /**
   * Check if the given Stripe Webhook Event is unprocessed, if it is, return
   * true and record its ID so that it can be used for future checks.
   */
  isStripeWebhookEventUnprocessed: dalWrapper(isStripeWebhookEventUnprocessed),

  /**
   * Mark a given Stripe Webhook Event as processed.
   */
  markStripeWebhookEventAsProcessed: dalWrapper(
    markStripeWebhookEventAsProcessed,
  ),

  /**
   * Create and save a new `StripeCustomer` object in data source. If `Org`
   * already have a StripeCustomer, replace it with this new one.
   */
  createStripeCustomer: dalWrapper(createStripeCustomer),

  /**
   * Get a `StripeCustomer` object back using a stripe customer ID.
   */
  getStripeCustomer: dalWrapper(getStripeCustomer),

  /**
   * Get a `StripeCustomer` object back using a `OrgID`.
   */
  getStripeCustomerOfOrg: dalWrapper(getStripeCustomerOfOrg),

  /**
   * Update metered product subscription ID.
   */
  updateStripeCustomerMeteredProductSubscription: dalWrapper(
    updateStripeCustomerMeteredProductSubscription,
  ),

  /**
   * Save a Stripe Setup Next action into the database
   */
  createStripeSetupNext: dalWrapper(createStripeSetupNext),

  /**
   * Get one from the database
   */
  getStripeSetupNext: dalWrapper(getStripeSetupNext),

  /**
   * Delete one from the database
   */
  deleteStripeSetupNext: dalWrapper(deleteStripeSetupNext),

  /**
   * Save a newly created API Key.
   */
  createApiKey: dalWrapper(createApiKey),

  /**
   * Get a single API Key Detail object back using its ID.
   */
  getApiKey: dalWrapper(getApiKey),

  /**
   * Get all API Key Detail objects of the Org.
   */
  getApiKeysOfOrg: dalWrapper(getApiKeysOfOrg),

  /**
   * Delete an API Key.
   */
  deleteApiKey: dalWrapper(deleteApiKey),

  /**
   * Get API Key's corresponding Org.
   */
  getApiKeyOrg: dalWrapper(getApiKeyOrg),
};
