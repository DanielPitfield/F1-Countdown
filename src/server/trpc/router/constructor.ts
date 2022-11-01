import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { SeasonInfo } from "./statistics";
import { CURRENT_DRIVER_LIMIT, MAX_LIMIT } from "../../../utils/limits";
import { DriverInfo } from "./driver";

export type ConstructorInfo = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export const constructorRouter = router({
  getInfo: publicProcedure
    .input(z.object({ constructorID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.constructorID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.ConstructorTable
        .Constructors[0]) as ConstructorInfo;
    }),

  getDrivers: publicProcedure
    .input(
      z.object({
        constructorID: z.string().min(1).trim(),
        isReturnOnlyCurrentDrivers: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = input.isReturnOnlyCurrentDrivers
        ? `http://ergast.com/api/f1/current/constructors/${input.constructorID}/drivers.json?limit=${CURRENT_DRIVER_LIMIT}`
        : `http://ergast.com/api/f1/constructors/${input.constructorID}/drivers.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.DriverTable.Drivers) as DriverInfo[];
    }),

  getWorldChampionshipWinningYears: publicProcedure
    .input(z.object({ constructorID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.constructorID}/constructorStandings/1/seasons.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.SeasonTable.Seasons) as SeasonInfo[];
    }),

  getPolePositions: publicProcedure
    .input(
      z.object({
        constructorID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.constructorID}/qualifying/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? (data.MRData.total as string)
        : data.MRData.RaceTable.Races;
    }),

  getRaceWins: publicProcedure
    .input(
      z.object({
        constructorID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.constructorID}/results/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? (data.MRData.total as string)
        : data.MRData.RaceTable.Races;
    }),

  getFastestLaps: publicProcedure
    .input(
      z.object({
        constructorID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.constructorID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? (data.MRData.total as string)
        : data.MRData.RaceTable.Races;
    }),
});
