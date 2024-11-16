import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Posts.tsx";
import Post from "./Post.tsx";
import {
  QueryClient,
  QueryClientContextProvider,
} from "../../../libs/simple-data-sync";

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

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientContextProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientContextProvider>
  );
}
