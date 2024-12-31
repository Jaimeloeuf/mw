import { config } from "../config/index.js";
import { asyncTierJobLoaderAndRunner } from "./asyncTierJobLoaderAndRunner.js";

/**
 * Bootstrap function for web tier to run async jobs if required.
 */
export async function bootstrapAsyncJobForWebTier() {
  // Running async jobs in web tier machine must be explicitly asked for
  if (!config.run_async_jobs_in_web_tier()) {
    return;
  }

  // Wait for 10s before the initial async run to let other things get setup and
  // readied first.
  await new Promise((res) => setTimeout(res, 10_000));

  // Kickstart the reccuring async job loading / execution cycle
  runAsyncJobRecurringly();
}

/**
 * Infinitely reschedules itself to run, sort of like a setInterval, but where
 * the timeout only starts after the current async job finish executing.
 */
async function runAsyncJobRecurringly() {
  await asyncTierJobLoaderAndRunner();

  // Schedule the next run
  setTimeout(runAsyncJobRecurringly, 10_000);
}
