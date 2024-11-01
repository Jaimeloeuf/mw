import { dalWrapper } from "../dalWrapper.js";

import { getAllBlogSubscriber } from "./getAllBlogSubscriber.df.js";
import { createBlogSubscriber } from "./createBlogSubscriber.df.js";
import { deleteBlogSubscriber } from "./deleteBlogSubscriber.df.js";
import { isEmailAlreadySubscribed } from "./isEmailAlreadySubscribed.df.js";

export const blogSubscriberRepo = {
  getAllBlogSubscriber: dalWrapper(getAllBlogSubscriber),
  createBlogSubscriber: dalWrapper(createBlogSubscriber),
  deleteBlogSubscriber: dalWrapper(deleteBlogSubscriber),
  isEmailAlreadySubscribed: dalWrapper(isEmailAlreadySubscribed),
};
