import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { DriverInfo } from "./driver";
import { TeamInfo } from "./team";
import { MAX_LIMIT } from "../../../utils/limits";

export type DriverSeasonHistory = {
  season: string;
  round: string;
  DriverStandings: {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Driver: DriverInfo;
    Constructors: TeamInfo[];
  }[];
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
  };
};

export const statisticsRouter = router({
  getDriverWorldChampionshipHistory: publicProcedure.query(async () => {
    // The historical information of every drivers world championship since 1950
    const API_URL = `http://ergast.com/api/f1/driverStandings/1.json?limit=${MAX_LIMIT}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    return (await data.MRData.StandingsTable
      .StandingsLists) as DriverSeasonHistory[];
  }),

  getTeamWorldChampionshipHistory: publicProcedure.query(async () => {
    // The historical information of every constructors world championship since 1958
    const API_URL = `http://ergast.com/api/f1/constructorStandings/1.json?limit=${MAX_LIMIT}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    return (await data.MRData.StandingsTable
      .StandingsLists) as TeamSeasonHistory[];
  }),
});
