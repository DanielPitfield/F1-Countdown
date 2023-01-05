import { router, publicProcedure } from "../trpc";
import { z } from "zod";

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
  getUpcomingGrandPrixWeekend: publicProcedure
    .input(z.object({ year: z.string().min(4).max(4).trim() }))
    .query(async ({ input }): Promise<UpcomingGrandPrixWeekend | undefined> => {
      // TODO: Instead of fetching from URL every reuqest, perhaps query prisma context that has these JSON files stored?
      const API_URL = `https://raw.githubusercontent.com/sportstimes/f1/main/_db/f1/${input.year}.json`;

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
    }),
});
