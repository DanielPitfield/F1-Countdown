import { z } from "zod";
import { Driver } from "./driver";
import { Team } from "./team";
import { Circuit } from "./circuit";
import { MAX_LIMIT } from "../../../data/limits";
import { DriverStanding, TeamStanding } from "./statistics";


export const grandPrixRouter = router({
  getSchedule: publicProcedure
    .input(
      z.object({
        season: z.string().length(4).trim(),
        roundNumber: z.string().min(1).max(2).trim(),
      })
    )
    .query(async ({ input }): Promise<GrandPrixWeekend> => {
      const API_URL = `https://ergast.com/api/f1/${input.season}/${input.roundNumber}.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.RaceTable.Races[0];
    }),

  getQualifying: publicProcedure
    .input(
      z.object({
        season: z.string().length(4).trim(),
        roundNumber: z.string().min(1).max(2).trim(),
      })
    )
    .query(async ({ input }): Promise<Qualifying> => {
      const API_URL = `https://ergast.com/api/f1/${input.season}/${input.roundNumber}/qualifying.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.RaceTable.Races[0];
    }),

  getRace: publicProcedure
    .input(
      z.object({
        season: z.string().length(4).trim(),
        roundNumber: z.string().min(1).max(2).trim(),
      })
    )
    .query(async ({ input }): Promise<Race> => {
      const API_URL = `https://ergast.com/api/f1/${input.season}/${input.roundNumber}/results.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.RaceTable.Races[0];
    }),

  getDriverStandingsAfter: publicProcedure
    .input(
      z.object({
        season: z.string().length(4).trim(),
        roundNumber: z.string().min(1).max(2).trim(),
      })
    )
    .query(async ({ input }): Promise<DriverStanding[]> => {
      const API_URL = `https://ergast.com/api/f1/${input.season}/${input.roundNumber}/driverStandings.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }),

  getTeamStandingsAfter: publicProcedure
    .input(
      z.object({
        season: z.string().length(4).trim(),
        roundNumber: z.string().min(1).max(2).trim(),
      })
    )
    .query(async ({ input }): Promise<TeamStanding[]> => {
      const API_URL = `https://ergast.com/api/f1/${input.season}/${input.roundNumber}/constructorStandings.json?limit=${MAX_LIMIT}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    }),
});
