import readline from "node:readline";

/**
 * Gets user confirmation yes/no input from CLI and convert to a boolean where
 * "yes" is true and "no" is false. Will keep looping till a valid input.
 */
export async function getCliConfirmationYesNoInput(
  confirmationMessage: string,
): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let confirmation: boolean | null = null;

  do {
    const answer = await new Promise((resolve: (answer: string) => void) =>
      rl.question(`${confirmationMessage} [y/n]: `, resolve),
    );

    if (answer === "y") {
      confirmation = true;
    } else if (answer === "n") {
      confirmation = false;
    } else {
      // eslint-disable-next-line no-console
      console.log("Invalid input, please try again ...");
    }
  } while (confirmation === null);

  rl.close();

  return confirmation;
}
