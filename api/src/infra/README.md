# api/src/infra/
Infra modules are service modules used for implementing interfaces with external systems. You can use infra modules to interface with external systems by either
1. Allowing incoming traffic to be routed from a controller to a service
    1. Do this by having functions/methods that can be called by your controller.
    1. And the function/method should call your associated service function.
1. Allows service to talk to external systems
    1. Do this by having functions/methods that can be called by your service function.
    1. The function/method will then interface with external systems either through direct API calls or SDK use.

For the most part, infra modules should not hold core business logic as all core business logic should be defined in service functions. The job of the infra modules can be thought of routing how internal systems interface with external systems, and how external systems can call into internal systems. Therefore, they can have some form of logic primarily for adapting data across the boundaries.


## Naming
1. Folders for generic infra services that is meant for all apps in the monorepo to use, should use a generic name.
1. Folders for app specific infra services should have the app name prefixed, e.g. the `OpenAi` service for Muwno only should be named `MuwnoOpenAi`.


## How to use?
Use infra modules by importing the `infra` namespace from `__generated/index.js`. For example,
```typescript
import { infra } from "../../__generated/index.js";

infra.emailSharedSendEmail(...)
```


## Infra module addition/deletion
Once a new infra module is added or a infra module is deleted, re-run codegen with `npm run codegen:cogenie all` to update the generated `infra` export namespace.

The codegen step responsible for this is `genInfraBarrelFile`.