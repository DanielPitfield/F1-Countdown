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

export const statisticsRouter = router({
  getWorldChampions: publicProcedure.query(async () => {
    const response = await fetch(
      "http://ergast.com/api/f1/driverStandings/1/drivers.json?limit=50"
    );
    const data = await response.json();
    const drivers: DriverInfo[] = await data.MRData.DriverTable.Drivers;
    return drivers;
  }),
});
