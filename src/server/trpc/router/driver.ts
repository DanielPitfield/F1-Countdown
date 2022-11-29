import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { Team } from "./team";
import { MAX_LIMIT } from "../../../utils/limits";
import { DriverStanding } from "./statistics";
import { Race } from "./grandPrix";
import { filterPodiums } from "../../../utils/filterPodiums";
import { getTotalNumChampionshipPoints } from "../../../utils/getTotalNumChampionshipPoints";

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

// Shape of fetched data for the finishing result of a driver in the world championship
export type DriverSeasonResultResponse = {
  season: string;
  round: string;
  // Property name and array INCORRECTLY suggest this is the driverStandings for every driver
  DriverStandings: DriverStanding[];
};

export type DriverSeasonResult = {
  // The year of the championship season
  season: string;
  // The round number of the last race in the season
  round: string;
  // The finishing result of a driver in the world championship (at the end of the season)
  driverStanding: DriverStanding;
};

// TODO: Toggle percentages (e.g wins/total races)
// TODO: Team History (show time period driving for teams)
// TODO: Picture (F1 22 card?) along with driver code and number?

export const driverRouter = router({
  getDescription: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Driver> => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.DriverTable.Drivers[0];
    }),

  isActive: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<boolean> => {
      const API_URL = `https://ergast.com/api/f1/current/drivers.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.DriverTable.Drivers.some(
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
        numCareerPoints: number;
        winningYears: DriverSeasonResult[];
        allYears: DriverSeasonResult[];
      }> => {
        const WINNING_YEARS_API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/driverStandings/1.json?limit=${MAX_LIMIT}`;
        const response_winning = await fetch(WINNING_YEARS_API_URL);
        const data_winning = await response_winning.json();

        const ALL_YEARS_API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/driverStandings.json?limit=${MAX_LIMIT}`;
        const response_all = await fetch(ALL_YEARS_API_URL);
        const data_all = await response_all.json();

        // The driver's position in the driver standings - for each year they won the world championship
        const winningYears: DriverSeasonResult[] =
          data_winning.MRData.StandingsTable.StandingsLists.map(
            (x: DriverSeasonResultResponse) => {
              return {
                season: x.season,
                round: x.round,
                driverStanding: x.DriverStandings[0],
              };
            }
          );

        // The driver's position in the driver standings - for each year of their career
        const allYears: DriverSeasonResult[] =
          data_all.MRData.StandingsTable.StandingsLists.map(
            (x: DriverSeasonResultResponse) => {
              return {
                season: x.season,
                round: x.round,
                driverStanding: x.DriverStandings[0],
              };
            }
          );

        return {
          numChampionshipsWon: parseInt(data_winning.MRData.total),
          numChampionshipsEntered: parseInt(data_all.MRData.total),
          numCareerPoints: getTotalNumChampionshipPoints(allYears),
          winningYears: winningYears,
          allYears: allYears,
        };
      }
    ),

  getTeamsDrivenFor: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Team[]> => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/constructors.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.ConstructorTable.Constructors;
    }),

  getRacesEntered: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        firstRace: Race;
        lastRace: Race;
        numPodiums: number;
        totalNum: number;
      }> => {
        const API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/results.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          firstRace: data.MRData.RaceTable.Races[0],
          lastRace: data.MRData.RaceTable.Races.at(-1),
          numPodiums: filterPodiums(data.MRData.RaceTable.Races).length,
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
        firstPole: Race;
        lastPole: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/qualifying/1.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
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
        firstWin: Race;
        lastWin: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/results/1.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          firstWin: data.MRData.RaceTable.Races[0],
          lastWin: data.MRData.RaceTable.Races.at(-1),
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),

  getNumFastestLaps: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<number> => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return parseInt(data.MRData.total);
    }),
});
