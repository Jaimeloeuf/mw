import { SimplePostProcessingBuilder } from "./SimplePostProcessingBuilder.js";

/**
 * Function to start the `SimplePostProcessing` creation process with builder
 * pattern to have a fluent API.
 */
export const CreateSimplePostProcessingJob = (serviceFunctionName: string) =>
  new SimplePostProcessingBuilder(serviceFunctionName);
