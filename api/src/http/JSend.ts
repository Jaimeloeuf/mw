/**
 * Reference <https://github.com/omniti-labs/jsend>
 *
 * Types for the JSend specification used for JSON based communication between
 * client/server.
 */

/**
 * On successful execution of an action.
 */
export type JSendSuccess<T = unknown> = {
  status: "success";
  data: T;
};

/**
 * On failed execution of an action. Used to represent exceptions i.e.
 * recoverable failure modes, e.g. user tried to delete a piece of data that is
 * already deleted.
 */
export type JSendFail<T = unknown> = {
  status: "fail";
  data: T;
};

/**
 * On action execution error. Used to represent errors, i.e. something that went
 * wrong when it should not have happened, e.g. DB connection error.
 */
export type JSendError<T = unknown> = {
  status: "error";
  message: string;
  code?: number;
  data?: T;
};
