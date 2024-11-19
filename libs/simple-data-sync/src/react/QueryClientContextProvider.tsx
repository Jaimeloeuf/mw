import * as React from "react";
import type { QueryClient } from "../core/QueryClient.js";

/**
 * React context to hold the query client.
 */
export const queryClientContext = React.createContext<null | QueryClient>(null);

/**
 * React context Provider wrapper component.
 */
export function QueryClientContextProvider(props: {
  client: QueryClient;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    // @todo Check if on client before attaching event listeners
    window.addEventListener("visibilitychange", () => {
      if (window.document.visibilityState === "visible") {
        props.client.onWindowFocus();
      }
    });
  }, [props.client]);

  return (
    <queryClientContext.Provider value={props.client}>
      {props.children}
    </queryClientContext.Provider>
  );
}
