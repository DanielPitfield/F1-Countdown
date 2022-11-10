import { router } from "../trpc";
import { statisticsRouter } from "./statistics";
import { driverRouter } from "./driver";
import { teamRouter } from "./team";
import { circuitRouter } from "./circuit";

export const appRouter = router({
  statistics: statisticsRouter,
  driver: driverRouter,
  team: teamRouter,
  circuit: circuitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
