import { useQuery } from "../../../libs/simple-data-sync";
import { Link, useParams } from "react-router-dom";

export default function Post() {
  console.log("Post: rendering");

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
              </div>
            );
        }
      })()}
    </>
  );
}
