import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { AsyncJobMachineType } from "../../../async/AsyncJobMachineType.js";
import type { AsyncJobPriorityType } from "../../../async/AsyncJobPriority.js";
import type { AsyncJobStatus } from "../../../async/AsyncJobStatus.js";

/**
 * Refer to `AsyncJob` type definition.
 */
export interface AsyncJobTable {
  id: ColumnType<string, string, never>;
  job_type_id: ColumnType<string, string, never>;
  status: ColumnType<AsyncJobStatus, AsyncJobStatus, AsyncJobStatus>;
  priority: ColumnType<
    AsyncJobPriorityType,
    AsyncJobPriorityType,
    AsyncJobPriorityType
  >;
  machine_type: ColumnType<
    AsyncJobMachineType,
    AsyncJobMachineType,
    AsyncJobMachineType
  >;
  caller: ColumnType<string, string, never>;
  stack_trace: ColumnType<string, string, never>;
  timeout: ColumnType<$Nullable<number>, $NullableAndOptional<number>, never>;
  time_scheduled: ColumnType<Date, string, never>;
  time_start_after: ColumnType<
    $Nullable<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_preprocess: ColumnType<
    $Nullable<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_start: ColumnType<
    $Nullable<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_finish: ColumnType<
    $Nullable<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  time_cancelled: ColumnType<
    $Nullable<Date>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  job_arguments: ColumnType<
    $Nullable<string>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  job_result: ColumnType<
    $Nullable<string>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
  cancellation_data: ColumnType<
    $Nullable<string>,
    $NullableAndOptional<string>,
    $NullableAndOptional<string>
  >;
}

export type AsyncJob = Selectable<AsyncJobTable>;
export type CreateAsyncJob = Insertable<AsyncJobTable>;
export type UpdateAsyncJob = Updateable<AsyncJobTable>;
