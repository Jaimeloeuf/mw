# Platform specific choices - Node v8
Currently the API is built on the assumption that it will be run on Node using the v8 engine.

These are some technical choices that are platform specific, and may/will break when using other platforms.

1. [getStackTrace](../api/src/utils/getStackTrace.ts)
    1. Stack trace is generated using a chrome specific method / format
    1. Details
        1. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack>
        1. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/captureStackTrace>