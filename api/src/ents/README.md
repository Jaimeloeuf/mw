# api/src/ents/
Use ents by importing the `ents` namespace from `__generated/index.js`. For example,
```typescript
import { ents } from "../../__generated/index.js";

const entJohari = await ents.EntJohariOperators.get(johariID);
```


## Creating new Ents
Create a new Ent using the npm script
```bash
npm run scripts:create-ent
```

This is implemented in [../scripts/create-ent.ts](../scripts/create-ent.ts)


## Service function addition/deletion
Once a new Ent is added or an Ent is deleted, re-run codegen with `npm run codegen all` to update the generated `ents` export namespace.

The codegen step responsible for this is `genEntBarrelFile`.