# api/src/services/
Use services by importing the `sv` namespace from `__generated/index.js`. For example,
```typescript
import { sv } from "../../__generated/index.js";

sv.leetcodeGetLeetcodeQues(...)
```


## Service function addition/deletion
Once a new service function is added or a service function is deleted, re-run codegen with `npm run codegen:cogenie all` to update the generated `sv` export namespace.

The codegen step responsible for this is `genServiceBarrelFile`.