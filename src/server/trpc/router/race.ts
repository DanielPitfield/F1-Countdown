import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { DriverInfo } from "./driver";
import { TeamInfo } from "./team";
import { CircuitInfo } from "./circuit";

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
  Time: { millis: string; time: string };
};

// Race information (including the finishing positions/result for every driver)
export type RaceInfo = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: CircuitInfo;
  date: string;
  Results: DriverRaceResult[];
};

export const raceRouter = router({
  getInfo: publicProcedure
    .input(z.object({ raceID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = ``;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData;
    }),
});
