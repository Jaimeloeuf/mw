/**
 * Data that is managed by the Ent framework, and should not be modified by end
 * users since these values are automatically filled.
 */
export type EntManagedData = {
  /**
   * ID generated by the framework.
   */
  readonly id: string;

  /**
   * Timestamp managed by the framework.
   */
  readonly createdAt: Date;

  /**
   * Timestamp managed by the framework.
   */
  updatedAt: Date;
};