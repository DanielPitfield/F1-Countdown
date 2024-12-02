import { z } from "zod";
import { MAX_LIMIT } from "../../../data/limits";
import { DriverStanding, TeamStanding } from "./statistics";
import { GrandPrixWeekend } from "./grandPrix";
import { Circuit } from "./circuit";

export const seasonRouter = router({
  // NOTE: When the seasonID "current" is used, data with incorrect dates can be returned from the endpoint
  getSchedule: publicProcedure
    .input(z.object({ seasonID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<GrandPrixWeekend[]> => {
      const API_URL = `https://ergast.com/api/f1/${input.seasonID}.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.RaceTable.Races;
    }),

  getCircuits: publicProcedure
    .input(z.object({ seasonID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<Circuit[]> => {
      const API_URL = `https://ergast.com/api/f1/${input.seasonID}/circuits.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.CircuitTable.Circuits;
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
