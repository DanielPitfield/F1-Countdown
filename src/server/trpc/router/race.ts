import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { DriverInfo } from "./driver";
import { TeamInfo } from "./team";
import { CircuitInfo } from "./circuit";
import { MAX_LIMIT } from "../../../utils/limits";

// The results information for an individual driver in a particular race
export type DriverRaceResult = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: DriverInfo;
  Constructor: TeamInfo;
  grid: string;
  laps: string;
  status: string;
  Time?: { millis: string; time: string };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: { time: string };
    AverageSpeed: { units: string; speed: string };
  };
};

// Race information (including the finishing positions/result for every driver)
export type RaceInfo = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: CircuitInfo;
  date: string;
  time?: string;
  Results: DriverRaceResult[];
};

export const raceRouter = router({
  getInfo: publicProcedure
    .input(
      z.object({
        season: z.string().length(4).trim(),
        roundNumber: z.string().min(1).max(2).trim(),
      })
    )
    .query(async ({ input }): Promise<RaceInfo> => {
      const API_URL = `https://ergast.com/api/f1/${input.season}/${input.roundNumber}/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.RaceTable.Races[0];
    }),
});
