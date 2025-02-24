/**
 * Type of all `AsyncJobPriority` values as a union of number literals.
 */
export type AsyncJobPriorityType =
  (typeof AsyncJobPriority)[keyof typeof AsyncJobPriority];

/**
 * Priority level of a Job Type or Job.
 */
export const AsyncJobPriority = {
  /**
   * Highest importance job, only allowed for SEV and other emergency situations
   * where all other jobs will be ignored until all P0 jobs finished.
   */
  p0: 0,

  /**
   * Important jobs for the business and user experience that should be
   * runned as soon as possible. E.g. processing a video the user uploaded
   */
  p1: 1,

  /**
   * @todo
   * maybe 1/2 both means same thing but is used to prevent high volume jobs
   * from starving out low volume jobs
   */
  p2: 2,

  /**
   * Jobs that needs to be runned eventually, but have no real time limit or
   * constraint, and will only be runned whenever there is free and available
   * resources. However the system will try to reasonably run these within a
   * time limit of ~ 1 week. Use this for background processing jobs that are
   * not critical like searching through the DB for invalid data to delete them.
   */
  p3: 3,
} as const;
