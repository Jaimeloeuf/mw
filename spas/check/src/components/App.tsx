import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient.ts";
import Home from "./Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

/**
 * Root component, that wraps the whole app to provide the Query Client, and to
 * display the current page view using the router.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8">
        <p className="text-4xl pb-8">Check</p>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}
