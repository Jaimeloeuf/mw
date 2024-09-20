import { dalWrapper } from "../dalWrapper.js";

import { getUser } from "./getUser.js";
import { createUser } from "./createUser.js";
import { updateUser } from "./updateUser.js";
import { deactivateUser } from "./deactivateUser.js";
import { isUserOnboarded } from "./isUserOnboarded.js";
import { canUserAccessOrg } from "./canUserAccessOrg.js";
import { getOrg } from "./getOrg.js";
import { getOrgOfUser } from "./getOrgOfUser.js";
import { createOrg } from "./createOrg.js";
import { updateOrg } from "./updateOrg.js";
import { getOrgMembers } from "./getOrgMembers.js";
import { createJoinOrgInvitation } from "./createJoinOrgInvitation.js";
import { getPendingJoinOrgInvitation } from "./getPendingJoinOrgInvitation.js";
import { getAllPendingJoinOrgInvitations } from "./getAllPendingJoinOrgInvitations.js";
import { getAllPendingJoinOrgInvitationsOfUser } from "./getAllPendingJoinOrgInvitationsOfUser.js";
import { deletePendingJoinOrgInvitation } from "./deletePendingJoinOrgInvitation.js";
import { removeOrgMember } from "./removeOrgMember.js";
import { canUserAccessProduct } from "./canUserAccessProduct.js";
import { getProduct } from "./getProduct.js";
import { getProductOrgID } from "./getProductOrgID.js";
import { getProductsOfUserOrg } from "./getProductsOfUserOrg.js";
import { createProduct } from "./createProduct.js";
import { updateProduct } from "./updateProduct.js";
import { deleteProduct } from "./deleteProduct.js";
import { transferProduct } from "./transferProduct.js";
import { getFeedbackform } from "./getFeedbackform.js";
import { createFeedbackResponse } from "./createFeedbackResponse.js";
import { getNumberOfFeedbackResponsesStoredByOrg } from "./getNumberOfFeedbackResponsesStoredByOrg.js";
import { getNumberOfFeedbackResponsesStoredByProduct } from "./getNumberOfFeedbackResponsesStoredByProduct.js";
import { getFeedbackResponse } from "./getFeedbackResponse.js";
import { getFeedbackResponses } from "./getFeedbackResponses.js";
import { getProductIdOfFeedbackResponse } from "./getProductIdOfFeedbackResponse.js";
import { createTask } from "./createTask.js";
import { getTask } from "./getTask.js";
import { updateTask } from "./updateTask.js";
import { deleteTask } from "./deleteTask.js";
import { getTasksOfResponse } from "./getTasksOfResponse.js";
import { getProductIdOfTask } from "./getProductIdOfTask.js";
import { markTaskAsDone } from "./markTaskAsDone.js";
import { createCustomer } from "./createCustomer.js";
import { getNumberOfCustomersStoredByOrg } from "./getNumberOfCustomersStoredByOrg.js";
import { markStripeWebhookEventAsProcessed } from "./markStripeWebhookEventAsProcessed.js";
import { createStripeCustomer } from "./createStripeCustomer.js";
import { getStripeCustomer } from "./getStripeCustomer.js";
import { getStripeCustomerOfOrg } from "./getStripeCustomerOfOrg.js";
import { updateStripeCustomerMeteredProductSubscription } from "./updateStripeCustomerMeteredProductSubscription.js";
import { createStripeSetupNext } from "./createStripeSetupNext.js";

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
};
