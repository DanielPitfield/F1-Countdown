import { Circuit } from "./Circuit";
import { Driver } from "./Driver";
import { Team } from "./Team";

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
  ThirdPractice?: { date: string; time: string };
  Qualifying: { date: string; time: string };
  // Some grand prix weekends will have a sprint race instead of a third practice session
  Sprint?: { date: string; time: string };
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

export type SessionName =
  | "Free Practice 1"
  | "Free Practice 2"
  | "Free Practice 3"
  | "Sprint Shootout"
  | "Qualifying"
  | "Sprint"
  | "Race";

export type WeekendSession = { name: SessionName; date: Date | null };
