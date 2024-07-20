import { dalNoThrow } from "../dalNoThrow.js";

import { getAllBlogSubscriber } from "./getAllBlogSubscriber.js";
import { createBlogSubscriber } from "./createBlogSubscriber.js";
import { deleteBlogSubscriber } from "./deleteBlogSubscriber.js";
import { isEmailAlreadySubscribed } from "./isEmailAlreadySubscribed.js";

export const blogSubscriberRepo = {
  getAllBlogSubscriber: dalNoThrow(getAllBlogSubscriber),
  createBlogSubscriber: dalNoThrow(createBlogSubscriber),
  deleteBlogSubscriber: dalNoThrow(deleteBlogSubscriber),
  isEmailAlreadySubscribed: dalNoThrow(isEmailAlreadySubscribed),
};
