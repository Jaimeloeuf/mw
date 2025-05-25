import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { AsyncJobMachineType } from "../../../async/AsyncJobMachine.js";
import type { AsyncJobPriorityType } from "../../../async/AsyncJobPriority.js";
import type { AsyncJobStatusType } from "../../../async/AsyncJobStatus.js";
import type {
  CreatedAtColumnType,
  NullableDateTimeColumnType,
} from "./types/index.js";

/**
 * Refer to `AsyncJob` type definition.
 */
export interface AsyncJobTable {
  id: ColumnType<string, string, never>;
  job_type_id: ColumnType<string, string, never>;
  status: ColumnType<
    AsyncJobStatusType,
    AsyncJobStatusType,
    AsyncJobStatusType
  >;
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
  time_scheduled: CreatedAtColumnType;
  time_start_after: NullableDateTimeColumnType;
  time_preprocess: NullableDateTimeColumnType;
  time_start: NullableDateTimeColumnType;
  time_finish: NullableDateTimeColumnType;
  time_cancelled: NullableDateTimeColumnType;
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
