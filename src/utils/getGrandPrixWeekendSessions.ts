import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";

export type WeekendSession = { name: string; date: Date | null };

export function getGrandPrixWeekendSessions(
  weekend: GrandPrixWeekend | undefined
): WeekendSession[] {
  if (!weekend) {
    return [];
  }

  // TODO: Add times to date objects (e.g weekend.FirstPractice.time)
  return [
    {
      name: "Free Practice 1",
      date: weekend.FirstPractice?.date
        ? new Date(weekend.FirstPractice.date)
        : null,
    },
    {
      name: "Free Practice 2",
      date: weekend.SecondPractice?.date
        ? new Date(weekend.SecondPractice.date)
        : null,
    },
    {
      name: "Free Practice 3",
      date: weekend.ThirdPractice?.date
        ? new Date(weekend.ThirdPractice.date)
        : null,
    },
    {
      name: "Qualifying",
      date: weekend.Qualifying?.date ? new Date(weekend.Qualifying.date) : null,
    },
    {
      name: "Race",
      date: new Date(weekend.date),
    },
  ];
}
