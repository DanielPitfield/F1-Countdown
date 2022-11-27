import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { MAX_LIMIT } from "../../../utils/limits";
import { Driver } from "./driver";
import { TeamStanding } from "./statistics";
import { Race } from "./grandPrix";

export type Team = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export type TeamSeasonHistory = {
  season: string;
  round: string;
  ConstructorStandings: TeamStanding[];
};

export const teamRouter = router({
  getInfo: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Team> => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.ConstructorTable.Constructors[0];
    }),

  isActive: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<boolean> => {
      const API_URL = `https://ergast.com/api/f1/current/constructors.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.ConstructorTable.Constructors.some(
        (team: Team) => team.constructorId === input.teamID
      );
    }),

  getDrivers: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<{ current: Driver[]; all: Driver[] }> => {
      const CURRENT_DRIVERS_API_URL = `http://ergast.com/api/f1/current/constructors/${input.teamID}/drivers.json`;
      const response_current = await fetch(CURRENT_DRIVERS_API_URL);
      const data_current = await response_current.json();

      const ALL_DRIVERS_API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/drivers.json?limit=${MAX_LIMIT}`;
      const response_all = await fetch(ALL_DRIVERS_API_URL);
      const data_all = await response_all.json();

      return {
        current: data_current.MRData.DriverTable.Drivers,
        all: data_all.MRData.DriverTable.Drivers,
      };
    }),

  getChampionshipResults: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        numChampionshipsWon: number;
        numChampionshipsEntered: number;
        winningYears: TeamSeasonHistory[];
        allYears: TeamSeasonHistory[];
      }> => {
        const WINNING_YEARS_API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/constructorStandings/1.json?limit=${MAX_LIMIT}`;
        const response_winning = await fetch(WINNING_YEARS_API_URL);
        const data_winning = await response_winning.json();

        const ALL_YEARS_API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/constructorStandings.json?limit=${MAX_LIMIT}`;
        const response_all = await fetch(ALL_YEARS_API_URL);
        const data_all = await response_all.json();

        return {
          numChampionshipsWon: parseInt(data_winning.MRData.total),
          numChampionshipsEntered: parseInt(data_all.MRData.total),
          winningYears: data_winning.MRData.StandingsTable.StandingsLists,
          allYears: data_all.MRData.StandingsTable.StandingsLists,
        };
      }
    ),

  getRacesEntered: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        raceTable: Race[];
        firstRace: Race;
        lastRace: Race;
        totalNum: number;
      }> => {
        const API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/results.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          raceTable: data.MRData.RaceTable.Races,
          firstRace: data.MRData.RaceTable.Races[0],
          lastRace: data.MRData.RaceTable.Races.at(-1),
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),

  getPolePositions: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        raceTable: Race[];
        firstPole: Race;
        lastPole: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/qualifying/1.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          raceTable: data.MRData.RaceTable.Races,
          firstPole: data.MRData.RaceTable.Races[0],
          lastPole: data.MRData.RaceTable.Races.at(-1),
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),

  getRaceWins: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        raceTable: Race[];
        firstWin: Race;
        lastWin: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/results/1.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          raceTable: data.MRData.RaceTable.Races,
          firstWin: data.MRData.RaceTable.Races[0],
          lastWin: data.MRData.RaceTable.Races.at(-1),
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),

  getFastestLaps: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({ input }): Promise<{ raceTable: Race[]; totalNum: number }> => {
        const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          raceTable: data.MRData.RaceTable.Races,
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),
});
