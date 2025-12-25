import fs from "fs";
import readline from "readline/promises";

import { logger } from "../../logging/Logger.js";

type InputConfig<T> = {
  /**
   * Name of the input, the validated and transformed input value will be saved
   * as this property name on the inputs object passed to the generate function
   * later on.
   */
  name: string;

  /**
   * CLI question prompt to show user to get their input
   */
  question: string;

  /**
   * Use this to validate the user's input and optionally transform the type
   * before returning the value. Throw error if there is an issue.
   */
  validateAndTransformInput(input: string): T;
};

type FileToGenerate = {
  path: string;
  generatedCode: string;
};

export function Scaffoldr<
  const InputConfigs extends Readonly<$NonEmptyArray<InputConfig<any>>>,
  const InputNames extends InputConfigs[number]["name"],
  const Inputs extends {
    [InputConfig in InputConfigs[number] as InputConfig["name"]]: ReturnType<
      InputConfig["validateAndTransformInput"]
    >;
  },
>(config: {
  /**
   * An array of `InputConfig<T>`
   */
  inputs: InputConfigs;

  /**
   * Your main codegen method that will be called with the inputs object with
   * validated and transformed values if reading user inputs is successful.
   * This expects your generated function to return the files to generate.
   */
  generate(
    inputs: Inputs,
  ): Array<FileToGenerate> | Promise<Array<FileToGenerate>>;

  /**
   * Callback function that is ran after all the generated files are saved.
   */
  onSave?: (inputs: Inputs) => void | Promise<void>;
}) {
  return {
    async run() {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const partialInputs: Partial<Inputs> = {};

      try {
        for (const inputConfig of config.inputs) {
          const rawUserInput = await rl.question(`${inputConfig.question}: `);
          const validatedUserInput =
            inputConfig.validateAndTransformInput(rawUserInput);
          partialInputs[inputConfig.name as InputNames] = validatedUserInput;
        }
      } catch (e) {
        const error = $convertUnknownCatchToError(e);
        logger.error(Scaffoldr.name, error.message);
        process.exit(1);
      }

      rl.close();

      const inputs = partialInputs as Inputs;

      const filesToGenerate = await config.generate(inputs);

      for (const file of filesToGenerate) {
        fs.writeFileSync(file.path, file.generatedCode);
        logger.info(Scaffoldr.name, `Created file: ${file.path}`);
      }

      await config?.onSave?.(inputs);

      logger.info(
        Scaffoldr.name,
        `Scaffolding complete, please update generated code files as needed.`,
      );
    },
  };
}
