import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getCurrentYear } from "../../../utils/getCurrentYear";

// The schedule for an upcoming event
export type UpcomingGrandPrixWeekend = {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  round: number;
  slug: string;
  localeKey: string;
  sessions: {
    fp1: string;
    fp2: string;
    fp3: string;
    qualifying: string;
    gp: string;
  };
};

export const homeRouter = router({
  getUpcomingGrandPrixWeekend: publicProcedure.query(
    async (): Promise<UpcomingGrandPrixWeekend | undefined> => {
      // Try getting the next event this year, if not (i.e. end of season), then try the next year
      return (
        getNextEventInYear(getCurrentYear()) ??
        getNextEventInYear(getCurrentYear() + 1)
      );
    }
  ),
});

async function getNextEventInYear(
  year: number
): Promise<UpcomingGrandPrixWeekend | undefined> {
  // TODO: Instead of fetching from URL every reuqest, perhaps query prisma context that has these JSON files stored?
  const API_URL = `https://raw.githubusercontent.com/sportstimes/f1/main/_db/f1/${year}.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // All the event information for the current season/year
  const schedule: UpcomingGrandPrixWeekend[] = data.races;

  // Find the first event which has a session in the future
  return schedule.find((event) =>
    Object.values(event.sessions).some(
      (session) => new Date(session) > new Date()
    )
  );
}
