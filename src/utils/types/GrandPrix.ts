import { Circuit } from "./Circuit";

// The schedule and information for a Grand Prix event/weekend
export type GrandPrixWeekend = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;

  FirstPractice: { date: string; time: string };

  // Sprint weekend (sprint qualifying and sprint race instead of two practice sessions)
  SprintQualifying?: { date: string; time: string };
  Sprint?: { date: string; time: string };

  // Typical race weekend (with a further two practice sessions)
  SecondPractice?: { date: string; time: string };
  ThirdPractice?: { date: string; time: string };

  Qualifying: { date: string; time: string };

  // Race date and time are not nested
  date: string;
  time: string;
};

export type SessionName =
  | "Free Practice 1"
  | "Free Practice 2"
  | "Free Practice 3"
  | "Sprint Qualifying"
  | "Sprint"
  | "Qualifying"
  | "Race";

export type WeekendSession = { name: SessionName; date: Date | null };
