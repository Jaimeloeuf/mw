# api/
Main folder for all API/backend code


## Entrypoint requirements
All other entrypoints that start outside of [index.ts](./src/index.ts) should include global side effect first
```typescript
import "./global/bootstrapGlobalDefinitions.js";
```