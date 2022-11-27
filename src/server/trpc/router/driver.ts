import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { Team } from "./team";
import { MAX_LIMIT } from "../../../utils/limits";
import { DriverStanding } from "./statistics";
import { Race } from "./grandPrix";
import { filterPodiums } from "../../../utils/filterPodiums";

export type Driver = {
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

// TODO: Toggle percentages (e.g wins/total races)
// TODO: Team History (show time period driving for teams)
// TODO: Picture (F1 22 card?) along with driver code and number?

export const driverRouter = router({
  getInfo: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Driver> => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.DriverTable.Drivers[0];
    }),

  isActive: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<boolean> => {
      const API_URL = `https://ergast.com/api/f1/current/drivers.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.DriverTable.Drivers.some(
        (driver: Driver) => driver.driverId === input.driverID
      );
    }),

  getChampionshipResults: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        numChampionshipsWon: number;
        numChampionshipsEntered: number;
        winningYears: DriverSeasonHistory[];
        allYears: DriverSeasonHistory[];
      }> => {
        const WINNING_YEARS_API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/driverStandings/1.json?limit=${MAX_LIMIT}`;
        const response_winning = await fetch(WINNING_YEARS_API_URL);
        const data_winning = await response_winning.json();

        const ALL_YEARS_API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/driverStandings.json?limit=${MAX_LIMIT}`;
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

  getTeamsDrivenFor: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Team[]> => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/constructors.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.ConstructorTable.Constructors;
    }),

  getRacesEntered: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        raceTable: Race[];
        podiums: Race[];
        firstRace: Race;
        lastRace: Race;
        totalNum: number;
      }> => {
        const API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/results.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          raceTable: data.MRData.RaceTable.Races,
          podiums: filterPodiums(data.MRData.RaceTable.Races),
          firstRace: data.MRData.RaceTable.Races[0],
          lastRace: data.MRData.RaceTable.Races.at(-1),
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),

  getPolePositions: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        raceTable: Race[];
        firstPole: Race;
        lastPole: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/qualifying/1.json?limit=${MAX_LIMIT}`;

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
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        raceTable: Race[];
        firstWin: Race;
        lastWin: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/results/1.json?limit=${MAX_LIMIT}`;

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
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(
      async ({ input }): Promise<{ raceTable: Race[]; totalNum: number }> => {
        const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          raceTable: data.MRData.RaceTable.Races,
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),
});
