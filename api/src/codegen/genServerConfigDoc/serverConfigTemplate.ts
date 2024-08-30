export const serverConfigTemplate = (
  generatedConfigRows: string,
) => `# Server Config
This documents all the available config values for [API server](../api/)


## Configs
| Config value | TS Type |
| - | - |
${generatedConfigRows}`;
