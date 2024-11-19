import * as React from "react";
import { QuerySubscriber } from "../core/QuerySubscriber.js";
import { queryClientContext } from "./QueryClientContextProvider.js";
import type { QueryOptions } from "../core/QueryOptions.js";

/**
 * React hook.
 */
export function useQuery<T>(queryOptions: QueryOptions<T>) {
  const [_rerenderCount, rerender] = React.useReducer((i: number) => i + 1, 0);

  const queryClient = React.useContext(queryClientContext);

  if (queryClient === null) {
    throw new Error(
      "QueryClient is not set! Please wrap your component with <QueryClientContextProvider client={new QueryClient()}><App /></QueryClientContextProvider>!"
    );
  }

  // Use a Ref to maintain one Unique QuerySubscriber per hook use
  const querySubscriberRef = React.useRef<null | QuerySubscriber<T>>(null);

  // Create and set the QuerySubscriber on first use
  if (querySubscriberRef.current === null) {
    querySubscriberRef.current = new QuerySubscriber(queryClient, queryOptions);
  }

  // Use a zero dependency useEffect to only trigger subscription once
  React.useEffect(function () {
    // Subscribe with the rerender function, to trigger React into re-rendering
    // the component that uses this hook when Query has a change.
    const unsubscribe = querySubscriberRef.current?.subscribe(rerender);

    // Return unsubscribe so that react can call this to clean up subscription
    // when the component that used this hook gets removed.
    return unsubscribe;
  }, []);

  return querySubscriberRef.current.getSubscription();
}
