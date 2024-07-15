import { registerGlobalUncaughtIssueHandlers } from "./registerGlobalUncaughtIssueHandlers.js";
import { bootstrapHttpServer } from "./http/index.js";

registerGlobalUncaughtIssueHandlers();
bootstrapHttpServer();
