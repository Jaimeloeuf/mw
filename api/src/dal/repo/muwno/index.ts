import { dataFn } from "../dataFn.js";

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
  getUser: dataFn(getUser),

  /**
   * Create a new User in data source
   */
  createUser: dataFn(createUser),

  /**
   * Update a User in data source
   */
  updateUser: dataFn(updateUser),

  /**
   * Deactivate a User account
   */
  deactivateUser: dataFn(deactivateUser),

  /**
   * Check if given user completed onboarding.
   *
   * To be considered onboarded
   * 1. User must have an Org
   * 2. The org must have a valid subscription
   */
  isUserOnboarded: dataFn(isUserOnboarded),

  /**
   * Check if user have access permission to this Org.
   */
  canUserAccessOrg: dataFn(canUserAccessOrg),

  /**
   * Get a single Org Entity object back
   */
  getOrg: dataFn(getOrg),

  /**
   * Get a user's Org Entity object back if they belong to an Org
   */
  getOrgOfUser: dataFn(getOrgOfUser),

  /**
   * Create a new Organisation in data source
   */
  createOrg: dataFn(createOrg),

  /**
   * Update an Organisation in data source
   */
  updateOrg: dataFn(updateOrg),

  /**
   * Get all members of the Org team, sorted by newest member first.
   */
  getOrgMembers: dataFn(getOrgMembers),

  /**
   * Create and save a team member invite into data source.
   */
  createJoinOrgInvitation: dataFn(createJoinOrgInvitation),

  /**
   * Get a pending team invitation using the given `invitationID`.
   */
  getPendingJoinOrgInvitation: dataFn(getPendingJoinOrgInvitation),

  /**
   * Get all pending team invitations of the given Org.
   */
  getAllPendingJoinOrgInvitations: dataFn(getAllPendingJoinOrgInvitations),

  /**
   * Get all pending team invitations of a given user.
   */
  getAllPendingJoinOrgInvitationsOfUser: dataFn(
    getAllPendingJoinOrgInvitationsOfUser,
  ),

  /**
   * Delete a pending team invitation.
   */
  deletePendingJoinOrgInvitation: dataFn(deletePendingJoinOrgInvitation),

  /**
   * Remove member from team and all their data from the team.
   */
  removeOrgMember: dataFn(removeOrgMember),

  /**
   * Check if user have access permission to this product.
   * If product does not exists, it is also treated as a lack of permission.
   */
  canUserAccessProduct: dataFn(canUserAccessProduct),

  /**
   * Get a single product the user can access.
   */
  getProduct: dataFn(getProduct),

  /**
   * Get a product's Org ID.
   */
  getProductOrgID: dataFn(getProductOrgID),

  /**
   * Get all products of the user's Org.
   */
  getProductsOfUserOrg: dataFn(getProductsOfUserOrg),

  /**
   * Create a new Product in data source
   */
  createProduct: dataFn(createProduct),

  /**
   * Update a Product
   */
  updateProduct: dataFn(updateProduct),

  /**
   * Delete a single product.
   */
  deleteProduct: dataFn(deleteProduct),

  /**
   * Transfer product to a different Org.
   */
  transferProduct: dataFn(transferProduct),

  /**
   * Get a feedback form object.
   */
  getFeedbackform: dataFn(getFeedbackform),

  /**
   * Save a feedback form response.
   */
  createFeedbackResponse: dataFn(createFeedbackResponse),

  /**
   * Get the number of survey responses currently stored for a given Org.
   */
  getNumberOfFeedbackResponsesStoredByOrg: dataFn(
    getNumberOfFeedbackResponsesStoredByOrg,
  ),

  /**
   * Get the number of survey responses currently stored for a given Product.
   */
  getNumberOfFeedbackResponsesStoredByProduct: dataFn(
    getNumberOfFeedbackResponsesStoredByProduct,
  ),

  /**
   * Get a single response.
   */
  getFeedbackResponse: dataFn(getFeedbackResponse),

  /**
   * Get survey responses of selected product, sorted by latest responses first.
   */
  getFeedbackResponses: dataFn(getFeedbackResponses),

  /**
   * Get feedback response data `a2` of the given productID, sorted by most
   * important and oldest first, and up to the first 1000 answers.
   */
  getFeedbackResponseA2: dataFn(getFeedbackResponseA2),

  /**
   * Get feedback response data `a3` of the given productID, sorted by most
   * important and oldest first, and up to the first 1000 answers.
   */
  getFeedbackResponseA3: dataFn(getFeedbackResponseA3),

  /**
   * Get Product's feedback response `a3`.
   * @todo Use a better name for this to not conflict with the above methods
   */
  getA3: dataFn(getA3),

  /**
   * Get product ID of a feedback response.
   */
  getProductIdOfFeedbackResponse: dataFn(getProductIdOfFeedbackResponse),

  /**
   * Create a new Task in data source.
   */
  createTask: dataFn(createTask),

  /**
   * Get Task from data source.
   */
  getTask: dataFn(getTask),

  /**
   * Update Task in data source.
   */
  updateTask: dataFn(updateTask),

  /**
   * Delete Task in data source.
   */
  deleteTask: dataFn(deleteTask),

  /**
   * Get Tasks of response from data source.
   */
  getTasksOfResponse: dataFn(getTasksOfResponse),

  /**
   * Get Tasks of product from data source.
   */
  getTasksOfProduct: dataFn(getTasksOfProduct),

  /**
   * Get `ProductID` of a given task.
   */
  getProductIdOfTask: dataFn(getProductIdOfTask),

  /**
   * Mark a task as done in data source.
   */
  markTaskAsDone: dataFn(markTaskAsDone),

  /**
   * Add a new Customer to data source.
   */
  createCustomer: dataFn(createCustomer),

  /**
   * Get the number of Customers currently stored by a given Org.
   */
  getNumberOfCustomersStoredByOrg: dataFn(getNumberOfCustomersStoredByOrg),

  /**
   * Check if the given Stripe Webhook Event is unprocessed, if it is, return
   * true and record its ID so that it can be used for future checks.
   */
  isStripeWebhookEventUnprocessed: dataFn(isStripeWebhookEventUnprocessed),

  /**
   * Mark a given Stripe Webhook Event as processed.
   */
  markStripeWebhookEventAsProcessed: dataFn(markStripeWebhookEventAsProcessed),

  /**
   * Create and save a new `StripeCustomer` object in data source. If `Org`
   * already have a StripeCustomer, replace it with this new one.
   */
  createStripeCustomer: dataFn(createStripeCustomer),

  /**
   * Get a `StripeCustomer` object back using a stripe customer ID.
   */
  getStripeCustomer: dataFn(getStripeCustomer),

  /**
   * Get a `StripeCustomer` object back using a `OrgID`.
   */
  getStripeCustomerOfOrg: dataFn(getStripeCustomerOfOrg),

  /**
   * Update metered product subscription ID.
   */
  updateStripeCustomerMeteredProductSubscription: dataFn(
    updateStripeCustomerMeteredProductSubscription,
  ),

  /**
   * Save a Stripe Setup Next action into the database
   */
  createStripeSetupNext: dataFn(createStripeSetupNext),

  /**
   * Get one from the database
   */
  getStripeSetupNext: dataFn(getStripeSetupNext),

  /**
   * Delete one from the database
   */
  deleteStripeSetupNext: dataFn(deleteStripeSetupNext),

  /**
   * Save a newly created API Key.
   */
  createApiKey: dataFn(createApiKey),

  /**
   * Get a single API Key Detail object back using its ID.
   */
  getApiKey: dataFn(getApiKey),

  /**
   * Get all API Key Detail objects of the Org.
   */
  getApiKeysOfOrg: dataFn(getApiKeysOfOrg),

  /**
   * Delete an API Key.
   */
  deleteApiKey: dataFn(deleteApiKey),

  /**
   * Get API Key's corresponding Org.
   */
  getApiKeyOrg: dataFn(getApiKeyOrg),
};
