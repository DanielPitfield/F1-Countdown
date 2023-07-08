import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { Team } from "./team";
import { MAX_LIMIT } from "../../../data/limits";
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
        const API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/driverStandings.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        // The driver's position in the driver standings - for each year of their career
        const allYears: DriverSeasonResult[] =
          data.MRData.StandingsTable.StandingsLists.map(
            (x: DriverSeasonResultResponse) => {
              return {
                season: x.season,
                round: x.round,
                driverStanding: x.DriverStandings[0],
              };
            }
          );

        const winningYears: DriverSeasonResult[] = allYears.filter(
          (year) => year.driverStanding.position === "1"
        );

        return {
          numChampionshipsWon: winningYears.length,
          numChampionshipsEntered: parseInt(data.MRData.total),
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

  getRaces: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
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
        const API_URL = `https://ergast.com/api/f1/drivers/${input.driverID}/results.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        // Every race the driver has participated in
        const allRaces: Race[] = data.MRData.RaceTable.Races;

        const winningRaces: Race[] = allRaces.filter((race) => {
          // What position did the driver in question finish for the race?
          const finishingPosition: string =
            race.Results.find(
              (result) => result.Driver.driverId === input.driverID
            )?.position ?? "";
          // Did they win the race?
          return finishingPosition === "1";
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

  getNumFastestLaps: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<number> => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input.driverID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return parseInt(data.MRData.total);
    }),
});
