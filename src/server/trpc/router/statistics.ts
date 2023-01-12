import { router, publicProcedure } from "../trpc";
import { MAX_LIMIT } from "../../../utils/limits";
import {
  Driver,
  DriverSeasonResult,
  DriverSeasonResultResponse,
} from "./driver";
import { Team, TeamSeasonResult, TeamSeasonResultResponse } from "./team";
import { Race } from "./grandPrix";

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
    async (): Promise<DriverSeasonResult[]> => {
      const API_URL = `http://ergast.com/api/f1/driverStandings/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      // The driver's position in the driver standings - for each year they won the world championship
      return data.MRData.StandingsTable.StandingsLists.map(
        (x: DriverSeasonResultResponse) => {
          return {
            season: x.season,
            round: x.round,
            driverStanding: x.DriverStandings[0],
          };
        }
      );
    }
  ),

  // The historical information of every constructor that has won the Constructor's World Championship (since 1958)
  getTeamWorldChampionshipHistory: publicProcedure.query(
    async (): Promise<TeamSeasonResult[]> => {
      const API_URL = `http://ergast.com/api/f1/constructorStandings/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      // The driver's position in the driver standings - for each year they won the world championship
      return data.MRData.StandingsTable.StandingsLists.map(
        (x: TeamSeasonResultResponse) => {
          return {
            season: x.season,
            round: x.round,
            teamStanding: x.ConstructorStandings[0],
          };
        }
      );
    }
  ),

  // The historical information of races won since 1950 (up to the max limit of 1000)
  getRaceWinnerHistoryPart1: publicProcedure.query(
    async (): Promise<Race[]> => {
      const API_URL = `https://ergast.com/api/f1/results/1.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.RaceTable.Races;
    }
  ),

  // The remaining historical information of races won (after the max limit of 1000)
  getRaceWinnerHistoryPart2: publicProcedure.query(
    async (): Promise<Race[]> => {
      const API_URL = `https://ergast.com/api/f1/results/1.json?limit=${MAX_LIMIT}&offset=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.RaceTable.Races;
    }
  ),
});
