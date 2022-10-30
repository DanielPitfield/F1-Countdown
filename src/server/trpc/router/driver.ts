import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { ConstructorInfo } from "./constructor";

export type DriverInfo = {
  driverId: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export const driverRouter = router({
  getInfo: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.DriverTable.Drivers[0]) as DriverInfo;
    }),

  getTeamsDrivenFor: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/constructors.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.ConstructorTable
        .constructors) as ConstructorInfo[];
    }),

  getPolePositions: publicProcedure
    .input(
      z.object({
        driverID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/qualifying/1.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? data.MRData.total
        : data.MRData.RaceTable.Races;
    }),

  getRaceWins: publicProcedure
    .input(
      z.object({
        driverID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/results/1.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? data.MRData.total
        : data.MRData.RaceTable.Races;
    }),

  getFastestLaps: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/fastest/1/results.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.RaceTable.Races;
    }),
});
