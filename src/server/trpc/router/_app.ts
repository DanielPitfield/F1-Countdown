import { router } from "../trpc";
import { statisticsRouter } from "./statistics";
import { driverRouter } from "./driver";
import { constructorRouter } from "./constructor";

export const appRouter = router({
  statistics: statisticsRouter,
  driver: driverRouter,
  constructor: constructorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
