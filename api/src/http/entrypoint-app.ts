// app.js (shared between server and client)

import { createSSRApp } from "vue";

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1, toggle: true }),
    // @todo How do i make this read Vue SFC?
    template: `
    <h1>This is a Vue SSR app</h1>
    <button @click="count++">{{ count }}</button>
    <br /><br />
    <button @click="toggle = !toggle">{{ toggle }}</button>
`,
  });
}
