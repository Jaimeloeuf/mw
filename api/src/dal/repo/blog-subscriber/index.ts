import { dataFn } from "../dataFn.js";

import { getAllBlogSubscriber } from "./getAllBlogSubscriber.df.js";
import { createBlogSubscriber } from "./createBlogSubscriber.df.js";
import { deleteBlogSubscriber } from "./deleteBlogSubscriber.df.js";
import { isEmailAlreadySubscribed } from "./isEmailAlreadySubscribed.df.js";

export const blogSubscriberRepo = {
  getAllBlogSubscriber: dataFn(getAllBlogSubscriber),
  createBlogSubscriber: dataFn(createBlogSubscriber),
  deleteBlogSubscriber: dataFn(deleteBlogSubscriber),
  isEmailAlreadySubscribed: dataFn(isEmailAlreadySubscribed),
};
