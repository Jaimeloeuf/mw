import { useQuery } from "../../../libs/simple-data-sync";
import { Link, useParams, useNavigate } from "react-router-dom";
import { queryClient } from "./queryClient";

export default function Post() {
  console.log("Post: rendering");

  const navigate = useNavigate();
  const { postID } = useParams();

  const { status, error, data } = useQuery<{
    title: string;
    body: string;
  }>({
    queryFn() {
      console.log("Post: queryFn called");
      return fetch(`http://localhost:3000/post/${postID}`).then((res) =>
        res.json()
      );
    },
    cacheKeys: `post/${postID}`,
  });

  async function deletePost() {
    await fetch(`http://localhost:3000/post/${postID}`, { method: "DELETE" });

    queryClient.invalidateQuery("posts", `post/${postID}`);

    navigate("/");
  }

  return (
    <>
      <h1>
        Post - <Link to="/">Back</Link>
      </h1>

      {(function () {
        switch (status) {
          case "loading":
            return <h1>...LOADING...</h1>;

          case "error":
            return <div>An error happened: {error?.toString()}</div>;

          case "success":
            return (
              <div>
                {data?.title}
                <br />
                {data?.body}
                <br />
                <button onClick={() => deletePost()}>delete</button>
              </div>
            );
        }
      })()}
    </>
  );
}
