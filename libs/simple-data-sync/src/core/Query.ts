import type { QueryState } from "./QueryState";
import type { QueryOptions } from "./QueryOptions";
import type { QuerySubscriber } from "./QuerySubscriber";

/**
 * `Query` maintains the logic of calling the given `queryFn`, handling request
 * deduplication, and notifying its `QuerySubscriber`s on `QueryState` change.
 */
export class Query<T> {
  constructor(private options: QueryOptions<T>) {}

  /**
   * A `Query`'s current `QueryState`.
   */
  public state: QueryState<T> = {
    // Since at this point `queryFn` hasnt been ran it, it can be considered to
    // be in a 'loading' state before something happens.
    status: "loading",
    isLoading: false,
    data: null,
    error: null,
    lastSuccessfulQueryTime: null,
  };

  /**
   * A `Query`'s current query promise if `queryFn` is being ran right now.
   */
  private queryExecutionPromise: null | Promise<void> = null;

  /**
   * `QuerySubscriber`s subscribed to the current Query instance.
   */
  private subscribers: Set<QuerySubscriber<T>> = new Set();

  /**
   * Call `queryStateChangeCallback` of all the `QuerySubscriber` subscribed to
   * this `Query`.
   */
  private notifySubscribers() {
    for (const subscriber of this.subscribers) {
      subscriber.queryStateChangeCallback();
    }
  }

  /**
   * Updates `QueryState` using a pure transformer function, and notify all the
   * `Query` subscribers with `notifySubscribers` method.
   */
  private updateQueryState(
    updater: (originalState: QueryState<T>) => QueryState<T>
  ) {
    this.state = updater(this.state);
    this.notifySubscribers();
  }

  /**
   * Run the queryFn and update `QueryState` accordingly.
   */
  private async runQuery() {
    this.updateQueryState((originalState) => ({
      ...originalState,

      // Reset state before making a new query
      isLoading: true,
      error: null,
    }));

    try {
      const data = await this.options.queryFn();

      this.updateQueryState((originalState) => ({
        ...originalState,

        status: "success",
        isLoading: false,
        lastSuccessfulQueryTime: Date.now(),
        data,
      }));
    } catch (error) {
      this.updateQueryState((originalState) => ({
        ...originalState,

        status: "error",
        isLoading: false,
        error: error as Error,
      }));
    }

    // Clear current query execution promise so that this query can be re-ran
    this.queryExecutionPromise = null;
  }

  /**
   * Run's the `Query`'s `queryFn` internally, while also handling request
   * de-dupes, by returning the existing query promise if exists instead of
   * creating a new query promise on every call.
   */
  run() {
    if (this.queryExecutionPromise === null) {
      this.queryExecutionPromise = this.runQuery();
    }

    return this.queryExecutionPromise;
  }

  /**
   * Add a subscriber
   */
  addSubscriber(subscriber: QuerySubscriber<T>) {
    this.subscribers.add(subscriber);

    // Return an unsubscribe function. Needs to be wrapped to have the
    // `() => void` function type signature.
    return () => {
      this.subscribers.delete(subscriber);
    };
  }
}
