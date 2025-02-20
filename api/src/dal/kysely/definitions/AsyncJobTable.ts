import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { AsyncJobMachineType } from "../../../async/AsyncJobMachineType.js";
import type { AsyncJobPriority } from "../../../async/AsyncJobPriority.js";
import type { AsyncJobStatus } from "../../../async/AsyncJobStatus.js";

/**
 * Refer to `AsyncJob` type definition.
 */
export interface AsyncJobTable {
  id: ColumnType<string, string, never>;
  job_type_id: ColumnType<string, string, never>;
  status: ColumnType<AsyncJobStatus, AsyncJobStatus, AsyncJobStatus>;
  priority: ColumnType<AsyncJobPriority, AsyncJobPriority, AsyncJobPriority>;
  machine_type: ColumnType<
    AsyncJobMachineType,
    AsyncJobMachineType,
    AsyncJobMachineType
  >;
  caller: ColumnType<string, string, never>;
  stack_trace: ColumnType<string, string, never>;
  timeout: ColumnType<
    $NullableAndOptional<number>,
    $NullableAndOptional<number>,
    never
  >;
  time_scheduled: ColumnType<Date, string, never>;
  time_start_after: ColumnType<
    $NullableAndOptional<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_preprocess: ColumnType<
    $NullableAndOptional<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_start: ColumnType<
    $NullableAndOptional<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_finish: ColumnType<
    $NullableAndOptional<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_cancelled: ColumnType<
    $NullableAndOptional<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  job_arguments: ColumnType<
    $NullableAndOptional<string>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  job_result: ColumnType<
    $NullableAndOptional<string>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  cancellation_data: ColumnType<
    $NullableAndOptional<string>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
}

export type AsyncJob = Selectable<AsyncJobTable>;
export type CreateAsyncJob = Insertable<AsyncJobTable>;
export type UpdateAsyncJob = Updateable<AsyncJobTable>;
