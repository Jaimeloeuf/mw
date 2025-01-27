import { BrowserRouter, Routes, Route, Link } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient.ts";
import Home from "./Home.tsx";
import CreateNew from "./CreateNew.tsx";
import AnswerForOthers from "./AnswerForOthers.tsx";
import View from "./View.tsx";

/**
 * Root component, that wraps the whole app to provide the Query Client, and to
 * display the current page view using the router.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-row justify-center">
          <div className="p-8 max-w-screen-sm w-full">
            <Link to="/">
              <p className="text-4xl pb-8">Johari</p>
            </Link>

            <Routes>
              <Route index element={<Home />} />
              <Route path="create" element={<CreateNew />} />
              <Route path="answer/:johariID" element={<AnswerForOthers />} />
              <Route path="view/:johariID" element={<View />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
