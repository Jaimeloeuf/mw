export const scriptTemplate = (generatedConfigRows: string) => `# Scripts
This documents all the available scripts [API server](../api/)


## Scripts
| Name | npm run command |
| - | - |
${generatedConfigRows}`;
