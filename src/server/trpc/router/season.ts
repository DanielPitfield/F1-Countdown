import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { MAX_LIMIT } from "../../../utils/limits";
import { DriverStanding, TeamStanding } from "./statistics";
import { Race } from "./grandPrix";

export const seasonRouter = router({
  getSchedule: publicProcedure
    .input(z.object({ seasonID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Race[]> => {
      const API_URL = `https://ergast.com/api/f1/${input.seasonID}.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.RaceTable.Races;
    }),

  getDriverStandings: publicProcedure
    .input(z.object({ seasonID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<DriverStanding[]> => {
      const API_URL = `http://ergast.com/api/f1/${input.seasonID}/driverStandings.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }),

  getTeamStandings: publicProcedure
    .input(z.object({ seasonID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<TeamStanding[]> => {
      const API_URL = `http://ergast.com/api/f1/${input.seasonID}/constructorStandings.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    }),
});
