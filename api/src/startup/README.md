# api/src/startup/
Folder for all the modules to run on main process startup.


## Notes
1. The modules will only be ran after [`config`](../config/) and [`dal`](../dal/) finished their bootstrap process, so you can access data during the startup process.
1. The modules will be ran before the HTTP web server is bootstrapped.
1. All the modules will be ran in parallel, do not rely on the order of execution.
1. If any of the modules throw, the web server will not continue.
    1. If you do not want this to happen, use a wrapper like `noThrowFunction` or `noThrowPromise` to ensure it does not happen
1. After new module addition/deletion/rename, please re-run codegen!