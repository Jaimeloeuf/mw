import { dalWrapper2 } from "../dalWrapper2.js";

import { getAllBlogSubscriber } from "./getAllBlogSubscriber.js";
import { createBlogSubscriber } from "./createBlogSubscriber.js";
import { deleteBlogSubscriber } from "./deleteBlogSubscriber.js";
import { isEmailAlreadySubscribed } from "./isEmailAlreadySubscribed.js";

export const blogSubscriberRepo = {
  getAllBlogSubscriber: dalWrapper2(getAllBlogSubscriber),
  createBlogSubscriber: dalWrapper2(createBlogSubscriber),
  deleteBlogSubscriber: dalWrapper2(deleteBlogSubscriber),
  isEmailAlreadySubscribed: dalWrapper2(isEmailAlreadySubscribed),
};
