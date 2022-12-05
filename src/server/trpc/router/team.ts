import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { MAX_LIMIT } from "../../../utils/limits";
import { Driver } from "./driver";
import { TeamStanding } from "./statistics";
import { Race } from "./grandPrix";
import { filterPodiums } from "../../../utils/filterPodiums";
import { getCurrentYear } from "../../../utils/getCurrentYear";

export type Team = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export type TeamSeasonResultResponse = {
  season: string;
  round: string;
  ConstructorStandings: TeamStanding[];
};

export type TeamSeasonResult = {
  season: string;
  round: string;
  teamStanding: TeamStanding;
};

export const teamRouter = router({
  getInfo: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Team> => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.ConstructorTable.Constructors[0];
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
        winningYears: TeamSeasonResult[];
        allYears: TeamSeasonResult[];
        isActive: boolean;
      }> => {
        const API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/constructorStandings.json?limit=${MAX_LIMIT}`;
        const response = await fetch(API_URL);
        const data = await response.json();

        // The team's position in the team standings - for each year of their career
        const allYears: TeamSeasonResult[] =
          data.MRData.StandingsTable.StandingsLists.map(
            (x: TeamSeasonResultResponse) => {
              return {
                season: x.season,
                round: x.round,
                teamStanding: x.ConstructorStandings[0],
              };
            }
          );

        const winningYears: TeamSeasonResult[] = allYears.filter(
          (year) => year.teamStanding.position === "1"
        );

        return {
          numChampionshipsWon: winningYears.length,
          numChampionshipsEntered: parseInt(data.MRData.total),
          winningYears: winningYears,
          allYears: allYears,
          isActive: allYears.at(-1)?.season === getCurrentYear(),
        };
      }
    ),

  getRacesEntered: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        firstRace: Race;
        lastRace: Race;
        numPodiums: number;
        totalNum: number;
      }> => {
        const API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/results.json?limit=${MAX_LIMIT}`;

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
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        firstPole: Race;
        lastPole: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/qualifying/1.json?limit=${MAX_LIMIT}`;

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
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        firstWin: Race;
        lastWin: Race;
        totalNum: number;
      }> => {
        const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/results/1.json?limit=${MAX_LIMIT}`;

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
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<number> => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return parseInt(data.MRData.total);
    }),
});
