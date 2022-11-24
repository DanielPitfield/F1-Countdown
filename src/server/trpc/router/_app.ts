import { router } from "../trpc";
import { statisticsRouter } from "./statistics";
import { driverRouter } from "./driver";
import { teamRouter } from "./team";
import { raceRouter } from "./race";
import { circuitRouter } from "./circuit";

export const appRouter = router({
  statistics: statisticsRouter,
  driver: driverRouter,
  team: teamRouter,
  race: raceRouter,
  circuit: circuitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
