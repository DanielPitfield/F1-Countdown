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
    const drivers: DriverInfo[] = await data.MRData.DriverTable.Drivers;

    const driverObjects = await Promise.all(
      // For each driver
      drivers.map(async (driver) => {
        // First name and surname
        const fullName = `${driver.givenName} ${driver.familyName}`;

        // Get the years they won the championship
        const response = await fetch(
          `http://ergast.com/api/f1/drivers/${driver.driverId}/driverStandings/1/seasons.json?limit=20`
        );
        const data = await response.json();
        const winningYears: SeasonInfo[] = await data.MRData.SeasonTable
          .Seasons;

        // Object of name and winning years
        return {
          name: fullName,
          winningYears: winningYears.map((yearInfo) => yearInfo.season),
        };
      })
    );

    return driverObjects;
  }),
});
