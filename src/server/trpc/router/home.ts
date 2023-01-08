import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import { GrandPrixWeekend } from "./grandPrix";
import { getGrandPrixWeekendSessions } from "../../../utils/getGrandPrixWeekendSessions";
import { seasonRouter } from "./season";
import { prisma } from "../../db/client";

export const homeRouter = router({
  getUpcomingGrandPrixWeekend: publicProcedure.query(
    async (): Promise<GrandPrixWeekend | undefined> => {
      // Call procedures from seasonRouter, from the server, using this caller
      const caller = seasonRouter.createCaller({ prisma });
      // Try getting the next event within the schedule of the current/most recent season
      const currentSeasonSchedule = await caller.getSchedule({
        seasonID: "current",
      });
      // If not (i.e. end of season), try getting the next event within the schedule of the current year
      const currentYearSchedule = await caller.getSchedule({
        seasonID: getCurrentYear().toString(),
      });

      return (
        getNextEventInYear(currentSeasonSchedule) ??
        getNextEventInYear(currentYearSchedule)
      );
    }
  ),
});

// Find the first event which has a session in the future
function getNextEventInYear(
  schedule: GrandPrixWeekend[]
): GrandPrixWeekend | undefined {
  return schedule.find((grandPrixWeekend) => {
    const sessions = getGrandPrixWeekendSessions(grandPrixWeekend);
    const sessionDates: Date[] = sessions.map((session) => session.date);

    return sessionDates.some((sessionDate) => sessionDate > new Date());
  });
}
