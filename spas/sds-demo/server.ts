import express from "express";
import cors from "cors";

const posts = {
  1: {
    title: "Post 1",
    body: "this is the first blog post in a series of long blog posts",
  },
  2: {
    title: "Post 2",
    body: "this is the second blog post in a series of long blog posts",
  },
  3: {
    title: "Post 3",
    body: "this is the third blog post in a series of long blog posts",
  },
  4: {
    title: "Post 4",
    body: "this is the fourth blog post in a series of long blog posts",
  },
};

express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get("/posts", async (_, res) => {
    // Simulate a time consuming API call
    await new Promise((res) => setTimeout(res, 1000));
    res.status(200).json(posts);
  })
  .get("/post/:postID", async (req, res) => {
    // Simulate a time consuming API call
    await new Promise((res) => setTimeout(res, 500));
    res.status(200).json(posts[req.params["postID"]]);
  })
  .delete("/post/:postID", async (req, res) => {
    // Simulate a time consuming API call
    await new Promise((res) => setTimeout(res, 1000));
    delete posts[req.params["postID"]];
    res.status(201).end();
  })
  .listen(3000, () => {
    console.log(`SDS Demo server listening on port ${3000}`);
  });
