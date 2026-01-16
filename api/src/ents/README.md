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


## Addition/Deletion
Once a new Ent is added or an Ent is deleted, re-run codegen with `npm run codegen:cogenie all` to update the generated `ents` export namespace. If you created the Ent using the script, it will trigger the codegen step for you.


## When to create new Ents?
- If it is a one to one relationship, then you usually dont want to create a new Ent, just modify the existing Ent and see how to adapt it to existing storage layer
- Only create a new Ent if it is a different relationship type or when explicitly needed
    - e.g. technically a UserSetting object can be part of the User object instead of being separated out
    - the main benefit here of splitting it out is that we can load them separately making things abit more efficient
    - but this also increases the complexity of the code you have to maintain to ensure that these are connected and in sync etc....