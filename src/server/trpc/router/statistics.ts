import { router, publicProcedure } from "../trpc";
import { z } from "zod";

type DriverInfo = {
  driverId: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

type SeasonInfo = {
  season: string;
  url: string;
};

export const statisticsRouter = router({
  getWorldChampions: publicProcedure.query(async () => {
    const response = await fetch(
      "http://ergast.com/api/f1/driverStandings/1/drivers.json?limit=50"
    );
    const data = await response.json();
    const drivers: DriverInfo[] = await data.MRData.DriverTable.Drivers;
    return drivers;
  }),

  getDriverWinningYears: publicProcedure
    // Must be atleast 1 character, also trim whitespace
    .input(z.object({ driverName: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `http://ergast.com/api/f1/drivers/${input?.driverName}/driverStandings/1/seasons.json?limit=20`
      );
      const data = await response.json();
      const winningSeasons: SeasonInfo[] = await data.MRData.SeasonTable
        .Seasons;
      return winningSeasons;
    }),
});
