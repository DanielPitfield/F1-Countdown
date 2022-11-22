import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TeamInfo } from "./team";
import { MAX_LIMIT } from "../../../utils/limits";
import { DriverStanding } from "./statistics";

export type DriverInfo = {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export type DriverSeasonHistory = {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
};

// TODO: Team History (show time period driving for teams)
// TODO: First race (first win?)
// TODO: Most recent race (also most recent win?)
// TODO: Is a current driver on the grid?
// TODO: Picture (F1 22 card?)

export const driverRouter = router({
  getInfo: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.DriverTable.Drivers[0]) as DriverInfo;
    }),

  getChampionshipResults: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const WINNING_YEARS_API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/driverStandings/1.json?limit=${MAX_LIMIT}`;
      const response_winning = await fetch(WINNING_YEARS_API_URL);
      const data_winning = await response_winning.json();

      const ALL_YEARS_API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/driverStandings.json?limit=${MAX_LIMIT}`;
      const response_all = await fetch(ALL_YEARS_API_URL);
      const data_all = await response_all.json();

      return {
        numChampionshipsWon: parseInt(data_winning.MRData.total),
        numChampionshipsEntered: parseInt(data_all.MRData.total),
        winningYears: data_winning.MRData.StandingsTable
          .StandingsLists as DriverSeasonHistory[],
        allYears: data_all.MRData.StandingsTable
          .StandingsLists as DriverSeasonHistory[],
      };
    }),

  getTeamsDrivenFor: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/constructors.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.ConstructorTable.Constructors) as TeamInfo[];
    }),

  getRacesEntered: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return {
        raceTable: data.MRData.RaceTable.Races,
        totalNum: parseInt(data.MRData.total),
      };
    }),

  getPolePositions: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/qualifying/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return {
        raceTable: data.MRData.RaceTable.Races,
        totalNum: parseInt(data.MRData.total),
      };
    }),

  getRaceWins: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/results/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return {
        raceTable: data.MRData.RaceTable.Races,
        totalNum: parseInt(data.MRData.total),
      };
    }),

  getFastestLaps: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return {
        raceTable: data.MRData.RaceTable.Races,
        totalNum: parseInt(data.MRData.total),
      };
    }),
});
