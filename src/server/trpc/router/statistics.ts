import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { DriverInfo } from "./driver";
import { ConstructorInfo } from "./constructor";

export type SeasonHistory = {
  season: string;
  round: string;
  DriverStandings: {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Driver: DriverInfo;
    Constructors: ConstructorInfo[];
  }[];
};

export type SeasonResult = {
  year: string;
  winningDriverID: string;
  winningDriverFullName: string;
  // The team of the driver's champion (not always the constructor's champion)
  winningDriverTeam: string;
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

    const seasonStandings: SeasonHistory[] = await data.MRData.StandingsTable
      .StandingsLists;

    return seasonStandings.map(
      (seasonHistory: SeasonHistory) =>
        ({
          year: seasonHistory.season,
          winningDriverID: seasonHistory.DriverStandings[0]?.Driver.driverId,
          winningDriverFullName: `${seasonHistory.DriverStandings[0]?.Driver.givenName} ${seasonHistory.DriverStandings[0]?.Driver.familyName}`,
          // The team of the driver's champion (not always the constructor's champion)
          winningDriverTeam:
            seasonHistory.DriverStandings[0]?.Constructors[0]?.constructorId,
        } as SeasonResult)
    );
  }),
});
