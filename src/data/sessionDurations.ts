import { SessionName } from "../utils/types/GrandPrix";

export const sessionDurations: { name: SessionName; minutes: number }[] = [
  { name: "Free Practice 1", minutes: 60 },
  { name: "Free Practice 2", minutes: 60 },
  { name: "Sprint", minutes: 45 }, // Usually 25-30 minutes but allow some leeway
  { name: "Free Practice 3", minutes: 60 },
  { name: "Qualifying", minutes: 60 }, // Q1 (18 mins), Q2 (15 mins), Q3 (12 mins) but time inbetween sessions too
  { name: "Race", minutes: 180 }, // 3 hour rule
];
