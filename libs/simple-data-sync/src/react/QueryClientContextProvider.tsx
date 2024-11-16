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
  return (
    <queryClientContext.Provider value={props.client}>
      {props.children}
    </queryClientContext.Provider>
  );
}
