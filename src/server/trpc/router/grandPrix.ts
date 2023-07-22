import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { Driver } from "./driver";
import { Team } from "./team";
import { Circuit } from "./circuit";
import { MAX_LIMIT } from "../../../data/limits";
import { DriverStanding, TeamStanding } from "./statistics";

// The schedule and information for a Grand Prix event/weekend
export type GrandPrixWeekend = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: { date: string; time: string };
  SecondPractice: { date: string; time: string };
  // Some grand prix weekends will have a sprint race instead of a third practice session
  Sprint?: { date: string; time: string };
  ThirdPractice?: { date: string; time: string };
  Qualifying: { date: string; time: string };
};

// The qualifying result for an individual driver
export type DriverQualifyingResult = {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Team;
  Q1: string;
  Q2: string;
  Q3: string;
};

export type Qualifying = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  QualifyingResults: DriverQualifyingResult[];
};

// The race result for an individual driver
export type DriverRaceResult = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Team;
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

export type Race = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  Results: DriverRaceResult[];
};

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
