import { getAllBlogSubscriber } from "./getAllBlogSubscriber.js";
import { createBlogSubscriber } from "./createBlogSubscriber.js";
import { deleteBlogSubscriber } from "./deleteBlogSubscriber.js";
import { isEmailAlreadySubscribed } from "./isEmailAlreadySubscribed.js";

export const blogSubscriberRepo = {
  getAllBlogSubscriber,
  createBlogSubscriber,
  deleteBlogSubscriber,
  isEmailAlreadySubscribed,
};
