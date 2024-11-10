import fs from "fs/promises";
import path from "path";

const importedCreateAppFile = await fs.readFile(
  path.resolve(import.meta.dirname, "./entrypoint-app.js"),
  "utf-8",
);

export const vueTemplate = (renderedHtml: string) => `
<!DOCTYPE html>
<html>
  <head>
    <title>SSR Example</title>
  </head>
  <body>
    <div id="app">${renderedHtml}</div>
    <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"
      }
    }
    </script>
    <script type="module">
    ${importedCreateAppFile}
    createApp().mount('#app')
    </script>
  </body>
</html>
`;
