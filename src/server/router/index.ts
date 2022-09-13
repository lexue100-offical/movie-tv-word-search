// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { resourcesRouter } from "./resources";
import { uploadRouter } from "./upload";
import { getVideoClassRouter } from "./get-video-class";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("example.", exampleRouter)
	.merge("resources.", resourcesRouter)
	.merge("upload.", uploadRouter)
	.merge("video.", getVideoClassRouter)
	.merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
