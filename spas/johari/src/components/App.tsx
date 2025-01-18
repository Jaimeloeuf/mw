import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient.ts";
import Home from "./Home.tsx";
import Answer from "./Answer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/answer",
    element: <Answer />,
  },
]);

/**
 * Root component, that wraps the whole app to provide the Query Client, and to
 * display the current page view using the router.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row justify-center">
        <div className="p-8 max-w-screen-sm">
          <p className="text-4xl pb-8">Johari</p>
          <RouterProvider router={router} />
        </div>
      </div>
    </QueryClientProvider>
  );
}
