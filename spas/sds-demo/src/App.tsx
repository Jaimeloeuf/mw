import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Posts.tsx";
import Post from "./Post.tsx";
import { QueryClientContextProvider } from "../../../libs/simple-data-sync";
import { queryClient } from "./queryClient.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "/post/:postID",
    element: <Post />,
  },
]);

export default function App() {
  return (
    <QueryClientContextProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientContextProvider>
  );
}
