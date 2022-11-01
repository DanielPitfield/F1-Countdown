import { router } from "../trpc";
import { statisticsRouter } from "./statistics";
import { driverRouter } from "./driver";
import { teamRouter } from "./team";

export const appRouter = router({
  statistics: statisticsRouter,
  driver: driverRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
