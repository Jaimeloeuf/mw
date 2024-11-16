import { useQuery } from "../../../libs/simple-data-sync";
import { Link } from "react-router-dom";

export default function Posts() {
  console.log("Posts: rendering");

  const { status, error, data } = useQuery<{
    [postID: string]: {
      title: string;
      body: string;
    };
  }>({
    queryFn() {
      console.log("Posts: queryFn called");
      return fetch("http://localhost:3000/posts").then((res) => res.json());
    },
    cacheKeys: ["posts"],
  });

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
                    <Link to={`post/${postID}`} key={postID}>
                      {post.title}
                      <br />
                      {post.body}
                      <br />
                      <br />
                      <br />
                    </Link>
                  );
                })}
              </div>
            );
        }
      })()}
    </>
  );
}
