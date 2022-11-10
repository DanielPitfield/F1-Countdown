import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { CURRENT_DRIVER_LIMIT, MAX_LIMIT } from "../../../utils/limits";
import { DriverInfo } from "./driver";

export type TeamInfo = {
  constructorID: string;
  url: string;
  name: string;
  nationality: string;
};

export type TeamSeasonHistory = {
  season: string;
  round: string;
  ConstructorStandings: {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Constructor: TeamInfo;
  }[];
};

export const teamRouter = router({
  getInfo: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.ConstructorTable.Constructors[0]) as TeamInfo;
    }),

  getDrivers: publicProcedure
    .input(
      z.object({
        teamID: z.string().min(1).trim(),
        isReturnOnlyCurrentDrivers: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = input.isReturnOnlyCurrentDrivers
        ? `http://ergast.com/api/f1/current/constructors/${input.teamID}/drivers.json?limit=${CURRENT_DRIVER_LIMIT}`
        : `http://ergast.com/api/f1/constructors/${input.teamID}/drivers.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.DriverTable.Drivers) as DriverInfo[];
    }),

  getChampionshipResults: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/constructorStandings.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.StandingsTable.StandingsLists) as TeamSeasonHistory[];
    }),

  getRacesEntered: publicProcedure
    .input(
      z.object({
        teamID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? (data.MRData.total as string)
        : data.MRData.RaceTable.Races;
    }),

  getPolePositions: publicProcedure
    .input(
      z.object({
        teamID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/qualifying/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? (data.MRData.total as string)
        : data.MRData.RaceTable.Races;
    }),

  getRaceWins: publicProcedure
    .input(
      z.object({
        teamID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/results/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? (data.MRData.total as string)
        : data.MRData.RaceTable.Races;
    }),

  getFastestLaps: publicProcedure
    .input(
      z.object({
        teamID: z.string().min(1).trim(),
        isReturnOnlyTotalNum: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await input.isReturnOnlyTotalNum)
        ? (data.MRData.total as string)
        : data.MRData.RaceTable.Races;
    }),
});
