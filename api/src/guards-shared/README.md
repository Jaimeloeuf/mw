# api/src/guards-shared/
Guards are sort of like assert functions, where nothing will happen if it "passes the validation", and if it the validation failed it will throw an exception/error.

The factory function should return a named function so that the function name can be used for logging purposes.

## Shared?
This folder contains all the guards that are shared across all apps/controllers/services.