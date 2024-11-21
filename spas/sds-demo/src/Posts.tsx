import { useQuery } from "../../../libs/simple-data-sync";
import { Link } from "react-router-dom";
import { queryClient } from "./queryClient";

export default function Posts() {
  console.log("Posts: rendering");

  const { status, error, data, refetch } = useQuery<{
    [postID: string]: {
      title: string;
      body: string;
    };
  }>({
    queryFn() {
      console.log("Posts: queryFn called");
      return fetch("http://localhost:3000/posts").then((res) => res.json());
    },
    cacheKey: "posts",
  });

  async function deletePost(postID: string) {
    await fetch(`http://localhost:3000/post/${postID}`, { method: "DELETE" });
    queryClient.invalidateQuery("posts", `post/${postID}`);
  }

  async function createNewPost() {
    await fetch(`http://localhost:3000/post`, { method: "POST" });
    refetch();
  }

  return (
    <>
      <h1>Posts</h1>

      {(function () {
        switch (status) {
          case "loading":
            return <h1>...LOADING...</h1>;

          case "error":
            return <div>An error happened: {error?.toString()}</div>;

          case "success":
            return (
              <div>
                {Object.entries(data!).map(([postID, post]) => {
                  return (
                    <div key={postID}>
                      <Link to={`post/${postID}`}>
                        {post.title}
                        <br />
                        {post.body}
                        <br />
                      </Link>
                      <button onClick={() => deletePost(postID)}>delete</button>
                      <br />
                      <br />
                      <br />
                    </div>
                  );
                })}
                <button onClick={createNewPost}>Create New Post</button>
              </div>
            );
        }
      })()}
    </>
  );
}
