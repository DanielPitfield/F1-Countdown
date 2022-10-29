import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { DriverInfo } from "./driver";

type SeasonInfo = {
  season: string;
  url: string;
};

export const statisticsRouter = router({
  getWorldChampions: publicProcedure.query(async () => {
    // Fetch all the drivers that have won a world championship
    const API_URL =
      "http://ergast.com/api/f1/driverStandings/1/drivers.json?limit=50";

    const response = await fetch(API_URL);
    const data = await response.json();
    const worldChampions: DriverInfo[] = await data.MRData.DriverTable.Drivers;

    return await Promise.all(
      // For each driver
      worldChampions.map(async (worldChampion) => {
        // Fetch the years they won the championship
        const API_URL = `http://ergast.com/api/f1/drivers/${worldChampion.driverId}/driverStandings/1/seasons.json?limit=20`;
        const fullName = `${worldChampion.givenName} ${worldChampion.familyName}`;

        const response = await fetch(API_URL);
        const data = await response.json();
        
        const winningYears: SeasonInfo[] = await data.MRData.SeasonTable
          .Seasons;

        return {
          name: fullName,
          winningYears: winningYears.map((yearInfo) => yearInfo.season),
        };
      })
    );
  }),
});
