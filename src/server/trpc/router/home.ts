import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import { GrandPrixWeekend } from "./grandPrix";
import { trpc } from "../../../utils/trpc";
import { getGrandPrixWeekendSessions } from "../../../utils/getGrandPrixWeekendSessions";

export const homeRouter = router({
  // TODO: Not sure if you can use procedures within other procedures, either way this fails to find the next event and returns undefined
  getUpcomingGrandPrixWeekend: publicProcedure.query(
    async (): Promise<GrandPrixWeekend | undefined> => {
      // Try getting the next event within the schedule of the most recent season
      const { data: currentSeasonSchedule } = trpc.season.getSchedule.useQuery({
        seasonID: "current",
      });

      // If not (i.e. end of season), try getting the next event within the schedule of the current year
      const { data: currentYearSchedule } = trpc.season.getSchedule.useQuery({
        seasonID: getCurrentYear().toString(),
      });

      return (
        getNextEventInYear(currentSeasonSchedule) ??
        getNextEventInYear(currentYearSchedule)
      );
    }
  ),
});

function getNextEventInYear(
  schedule: GrandPrixWeekend[] | undefined
): GrandPrixWeekend | undefined {
  // Find the first event which has a session in the future
  return schedule?.find((weekend) => {
    const sessionDates: Date[] = getGrandPrixWeekendSessions(weekend).map(
      (session) => session.date
    );
    return sessionDates.some((sessionDate) => sessionDate > new Date());
  });
}
