// src/server/router/_app.ts
import { router } from "../trpc";

import { exampleRouter } from "./example";
import { statisticsRouter } from "./statistics";

export const appRouter = router({
  example: exampleRouter,
  statistics: statisticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
