import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { AsyncJobStatus } from "../../../post-processing/async/AsyncJobStatus.js";
import type { NullableAndVoidable } from "../../../types/index.js";

/**
 * Refer to `AsyncJob` type definition.
 */
export interface AsyncJobTable {
  id: ColumnType<string, string, never>;
  job_type_id: ColumnType<string, string, never>;
  status: ColumnType<AsyncJobStatus, AsyncJobStatus, AsyncJobStatus>;
  caller: ColumnType<string, string, never>;
  stack_trace: ColumnType<string, string, never>;
  timeout: ColumnType<
    NullableAndVoidable<number>,
    NullableAndVoidable<number>,
    never
  >;
  time_scheduled: ColumnType<Date, string, never>;
  time_start: ColumnType<
    NullableAndVoidable<Date>,
    NullableAndVoidable<string>,
    NullableAndVoidable<string>
  >;
  time_finish: ColumnType<
    NullableAndVoidable<Date>,
    NullableAndVoidable<string>,
    NullableAndVoidable<string>
  >;
  job_arguments: ColumnType<
    NullableAndVoidable<string>,
    NullableAndVoidable<string>,
    NullableAndVoidable<string>
  >;
  job_result: ColumnType<
    NullableAndVoidable<string>,
    NullableAndVoidable<string>,
    NullableAndVoidable<string>
  >;
}

export type AsyncJob = Selectable<AsyncJobTable>;
export type CreateAsyncJob = Insertable<AsyncJobTable>;
export type UpdateAsyncJob = Updateable<AsyncJobTable>;
