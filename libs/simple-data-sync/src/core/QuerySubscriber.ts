import type { Query } from "./Query";
import type { QueryClient } from "./QueryClient";
import type { QueryOptions } from "./QueryOptions";

/**
 * A `QuerySubscriber` subscribes to a Query in a given `QueryClient`, to allow
 * `QuerySubscriber` users to subscribe to `QueryState` changes
 */
export class QuerySubscriber<T> {
  /**
   * The `Query` that this `QuerySubscriber` instance subscribes to.
   */
  private query: Query<T>;

  constructor(
    queryClient: QueryClient,
    private readonly queryOptions: QueryOptions<T>
  ) {
    this.query = queryClient.getQuery(queryOptions);
  }

  /**
   * Callback function ran by `Query` when its internal `QueryState` changes.
   *
   * Defaults to a No-Op, and will be set by `QuerySubscriber` users with the
   * `subscribe` method.
   */
  queryStateChangeCallback: () => void = () => {};

  /**
   * Subscribe to this `Query`'s `QueryState` changes.
   *
   * The `queryStateChangeCallback` should most likely be a re-render function.
   */
  subscribe(queryStateChangeCallback: () => void) {
    this.queryStateChangeCallback = queryStateChangeCallback;

    // Add self as a subscriber to the `Query`'s `QueryState` changes.
    const unsubscribe = this.query.addSubscriber(this);

    this.runQueryIfStale();

    return unsubscribe;
  }

  /**
   * Run query if the query has never been ran before, or if the cached query is
   * past its stale time.
   */
  runQueryIfStale() {
    if (
      this.query.state.lastSuccessfulQueryTime === null ||
      Date.now() - this.query.state.lastSuccessfulQueryTime >
        (this.queryOptions?.staleAfterMilliseconds ?? 0)
    ) {
      this.query.run();
    }
  }

  /**
   * Get `QueryState` of the `Query` this `QuerySubscriber` subscribes to.
   */
  getResult() {
    return this.query.state;
  }
}
