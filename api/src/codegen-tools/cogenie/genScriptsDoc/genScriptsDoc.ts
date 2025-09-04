import { genAndSaveGeneratedDoc } from "../../../codegen-lib/codegenForDoc/index.js";
import { scriptTemplate } from "./scriptTemplate.js";

/**
 * Generate documentation for all the available scripts for the API server.
 */
export async function genScriptsDoc() {
  const { default: packageJson } = await import("../../../../package.json", {
    assert: {
      type: "json",
    },
  });

  const scriptCommands: Array<string> = [];
  const scriptsPrefix = "scripts:";

  for (const script in packageJson["scripts"]) {
    if (script.startsWith(scriptsPrefix)) {
      scriptCommands.push(script.slice(scriptsPrefix.length));
    }
  }

  const scripts = scriptCommands
    .map(
      (scriptCommand) =>
        `|${scriptCommand}|npm run ${scriptsPrefix}${scriptCommand}`,
    )
    .join("\n");

  const generatedDoc = scriptTemplate(scripts);

  await genAndSaveGeneratedDoc(genScriptsDoc, generatedDoc, "Scripts");
}
