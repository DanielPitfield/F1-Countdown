import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { GrandPrixWeekend } from "./grandPrix";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import { getNextEventInYear } from "../../../utils/getNextEventInYear";
import { seasonRouter } from "./season";
import { prisma } from "../../db/client";

const caller = seasonRouter.createCaller({ prisma });

export const homeRouter = router({
  getUpcomingGrandPrixWeekend: publicProcedure.query(
    async (): Promise<GrandPrixWeekend | undefined> => {
      const currentYearSchedule = await caller.getSchedule({
        seasonID: getCurrentYear().toString(),
      });

      // TODO: Early return here if event has been found or would that be conditionally calling a hook?
      // TODO: The currentSeasonSchedule returns an incorrect next event

      // Otherwise, try getting the next event using "current" field within request URL
      const currentSeasonSchedule = await caller.getSchedule({
        seasonID: "current",
      });

      return (
        getNextEventInYear(currentYearSchedule ?? []) ??
        getNextEventInYear(currentSeasonSchedule ?? [])
      );
    }
  ),
});
