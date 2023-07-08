import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { MAX_LIMIT } from "../../../data/limits";
import { Driver } from "./driver";
import { TeamStanding } from "./statistics";
import { Race } from "./grandPrix";
import { filterPodiums } from "../../../utils/filterPodiums";

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

  getCurrentDrivers: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Driver[]> => {
      const API_URL = `http://ergast.com/api/f1/current/constructors/${input.teamID}/drivers.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.DriverTable.Drivers;
    }),

  getAllDrivers: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Driver[]> => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/drivers.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.DriverTable.Drivers;
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
        };
      }
    ),

  getRaces: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        numRacesEntered: number;
        numPodiums: number;
        numWins: number;
        firstRace: Race | undefined;
        lastRace: Race | undefined;
        firstWin: Race | undefined;
        lastWin: Race | undefined;
      }> => {
        const API_URL = `https://ergast.com/api/f1/constructors/${input.teamID}/results.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        // Every race the team has participated in
        const allRaces: Race[] = data.MRData.RaceTable.Races;

        const winningRaces: Race[] = allRaces.filter((race) => {
          // What is the team of the driver that won the race?
          const winningTeam = race.Results.find(
            (result) => result.position === "1"
          )?.Constructor;

          // Is that the team in question?
          return winningTeam?.constructorId === input.teamID;
        });

        return {
          numRacesEntered: parseInt(data.MRData.total),
          numPodiums: filterPodiums(allRaces).length,
          numWins: winningRaces.length,
          firstRace: allRaces[0],
          lastRace: allRaces.at(-1),
          firstWin: winningRaces[0],
          lastWin: winningRaces.at(-1),
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

  getNumFastestLaps: publicProcedure
    .input(z.object({ teamID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<number> => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input.teamID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return parseInt(data.MRData.total);
    }),
});
