// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { exampleRouter } from "./example";
import { resourcesRouter } from "./resources";
import { protectedExampleRouter } from "./protected-example-router";
export var appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("resources.", resourcesRouter)
    .merge("auth.", protectedExampleRouter);
