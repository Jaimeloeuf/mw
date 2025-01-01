import { df } from "../__generated/index.js";
import { config } from "../config/index.js";
import { AsyncJobMachineType } from "./AsyncJobMachineType.js";
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

  const [err, numberOfJobsQueued] = await df.asyncGetNumberOfJobsQueued.run(
    AsyncJobMachineType.web,
  );

  // If there is an error trying to get Job Queue count or if there is no job in
  // the queue, wait for a generous 10mins before checking again, else try to
  // clear the queue asap with a 1s delay in between to ensure that the web tier
  // traffic doesnt get too big of a impact running async jobs.
  const timeDelayBeforeNextRun =
    err !== null || numberOfJobsQueued === 0 ? 600_000 : 1000;

  // Schedule the next run
  setTimeout(runAsyncJobRecurringly, timeDelayBeforeNextRun);
}
