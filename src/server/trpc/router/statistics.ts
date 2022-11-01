import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { DriverInfo } from "./driver";
import { TeamInfo } from "./team";

export type SeasonHistory = {
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

export type SeasonInfo = {
  season: string;
  url: string;
};

export const statisticsRouter = router({
  getDriverWorldChampionshipHistory: publicProcedure.query(async () => {
    // The historical information of every driver's world championship since 1950
    const API_URL = "http://ergast.com/api/f1/driverStandings/1.json?limit=100";

    const response = await fetch(API_URL);
    const data = await response.json();

    return (await data.MRData.StandingsTable.StandingsLists) as SeasonHistory[];
  }),
});
