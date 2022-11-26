import { router, publicProcedure } from "../trpc";
import { MAX_LIMIT } from "../../../utils/limits";
import { Driver, DriverSeasonHistory } from "./driver";
import { Team, TeamSeasonHistory } from "./team";
import { Race } from "./race";

export type DriverStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Team[];
};

export type TeamStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Team;
};

// The historical information of every driver that has won the Driver's World Championship (since 1950)
export const statisticsRouter = router({
  getDriverWorldChampionshipHistory: publicProcedure.query(
    async (): Promise<DriverSeasonHistory[]> => {
      const API_URL = `http://ergast.com/api/f1/driverStandings/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.StandingsTable.StandingsLists;
    }
  ),

  // The historical information of every constructor that has won the Constructor's World Championship (since 1958)
  getTeamWorldChampionshipHistory: publicProcedure.query(
    async (): Promise<TeamSeasonHistory[]> => {
      const API_URL = `http://ergast.com/api/f1/constructorStandings/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.StandingsTable.StandingsLists;
    }
  ),

  // The historical information of races won since 1950 (up to the max limit of 1000)
  getRaceWinnerHistoryPart1: publicProcedure.query(
    async (): Promise<Race[]> => {
      const API_URL = `https://ergast.com/api/f1/results/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.RaceTable.Races;
    }
  ),

  // The remaining historical information of races won (after the max limit of 1000)
  getRaceWinnerHistoryPart2: publicProcedure.query(
    async (): Promise<Race[]> => {
      const API_URL = `https://ergast.com/api/f1/results/1.json?limit=${MAX_LIMIT}&offset=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.RaceTable.Races;
    }
  ),

  // The driver standings for the current season
  getCurrentDriverStandings: publicProcedure.query(
    async (): Promise<DriverStanding[]> => {
      const API_URL = `https://ergast.com/api/f1/current/driverStandings.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }
  ),

  // The constructor standings for the current season
  getCurrentTeamStandings: publicProcedure.query(
    async (): Promise<TeamStanding[]> => {
      const API_URL = `https://ergast.com/api/f1/current/constructorStandings.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings;
    }
  ),
});
