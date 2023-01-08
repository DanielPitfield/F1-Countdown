import { router } from "../trpc";
import { statisticsRouter } from "./statistics";
import { driverRouter } from "./driver";
import { teamRouter } from "./team";
import { seasonRouter } from "./season";
import { grandPrixRouter } from "./grandPrix";
import { circuitRouter } from "./circuit";

export const appRouter = router({
  statistics: statisticsRouter,
  driver: driverRouter,
  team: teamRouter,
  season: seasonRouter,
  grandPrix: grandPrixRouter,
  circuit: circuitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
