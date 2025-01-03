import type { AsyncJobType } from "./AsyncJobType.js";

/**
 * Mapping of `AsyncJobType['ID']` to `AsyncJobType`.
 *
 * Use `import` function to asynchronously load the job definition module, so
 * that they are not all loaded on startup and only lazily loaded whenever they
 * are used.
 *
 * @todo Codegen this instead of manually defining
 */
export const mappingOfAsyncJobs: Record<
  string,
  () => Promise<{ default: AsyncJobType<any> }>
> = {
  "186e39bb-0bd5-451c-8a90-557ae9a54ca8": () => import("./jobs/example.job.js"),
};
