import { router } from "../trpc";
import { statisticsRouter } from "./statistics";
import { driverRouter } from "./driver";

export const appRouter = router({
  statistics: statisticsRouter,
  driver: driverRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
