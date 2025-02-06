import { BrowserRouter, Routes, Route, Link } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
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
    <ErrorBoundary
      fallback={
        <div className="flex h-dvh w-dvw flex-row items-center justify-center">
          Oops... something went seriously wrong...
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="flex flex-row justify-center">
            <div className="w-full max-w-screen-sm p-8">
              <Link to="/">
                <p className="pb-8 text-4xl">Johari</p>
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
    </ErrorBoundary>
  );
}
