# api/src/dal/
dal (Data Access Layer)

This houses all the code that defines the data model, its accessor and mutation code.


## How to use
Use the `data functions` by importing the `df` namespace from `__generated/index.js`. For example,
```typescript
import { df } from "../../__generated/index.js";

df.leetcodeGetLeetcodeQues.runAndThrowOnError(...)
```


## Data function addition/deletion
Once a new data function is added or a data function is deleted, re-run codegen with `npm run codegen:cogenie all` to update the generated `df` export namespace.

The codegen step responsible for this is `genDataFunctionBarrelFile`.