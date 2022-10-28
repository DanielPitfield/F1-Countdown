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
    // Get all the drivers that have won a world championship
    const response = await fetch(
      "http://ergast.com/api/f1/driverStandings/1/drivers.json?limit=50"
    );
    const data = await response.json();
    const worldChampions: DriverInfo[] = await data.MRData.DriverTable.Drivers;

    return await Promise.all(
      // For each driver
      worldChampions.map(async (worldChampion) => {
        // First name and surname
        const fullName = `${worldChampion.givenName} ${worldChampion.familyName}`;

        // Get the years they won the championship
        const response = await fetch(
          `http://ergast.com/api/f1/drivers/${worldChampion.driverId}/driverStandings/1/seasons.json?limit=20`
        );
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

  getRaceWinners: publicProcedure.query(async () => {
    // Get all the drivers that have won a world championship
    const response = await fetch(
      "http://ergast.com/api/f1/driverStandings/1/drivers.json?limit=50"
    );
    const data = await response.json();
    const worldChampions: DriverInfo[] = await data.MRData.DriverTable.Drivers;

    return await Promise.all(
      // For each driver
      worldChampions.map(async (worldChampion) => {
        // First name and surname
        const fullName = `${worldChampion.givenName} ${worldChampion.familyName}`;

        // Get the years they won the championship
        const response = await fetch(
          `http://ergast.com/api/f1/drivers/${worldChampion.driverId}/driverStandings/1/seasons.json?limit=20`
        );
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
