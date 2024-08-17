import { dalWrapper } from "../dalWrapper.js";

import { getAllBlogSubscriber } from "./getAllBlogSubscriber.js";
import { createBlogSubscriber } from "./createBlogSubscriber.js";
import { deleteBlogSubscriber } from "./deleteBlogSubscriber.js";
import { isEmailAlreadySubscribed } from "./isEmailAlreadySubscribed.js";

export const blogSubscriberRepo = {
  getAllBlogSubscriber: dalWrapper(getAllBlogSubscriber),
  createBlogSubscriber: dalWrapper(createBlogSubscriber),
  deleteBlogSubscriber: dalWrapper(deleteBlogSubscriber),
  isEmailAlreadySubscribed: dalWrapper(isEmailAlreadySubscribed),
};
