import { Circuit } from "./Circuit";

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

export type SessionName =
  | "Free Practice 1"
  | "Free Practice 2"
  | "Free Practice 3"
  | "Sprint Shootout"
  | "Qualifying"
  | "Sprint"
  | "Race";

export type WeekendSession = { name: SessionName; date: Date | null };
