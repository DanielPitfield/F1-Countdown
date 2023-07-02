import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";

export type WeekendSession = { name: string; date: Date | null };

// Get the date object of a session (using both date and time)
function getFullSessionDate(
  session: { date: string; time: string } | undefined
): Date | null {
  if (!session) {
    return null;
  }

  return new Date(`${session.date} ${session.time}`);
}

export function getGrandPrixWeekendSessions(
  weekend: GrandPrixWeekend | undefined | null
): WeekendSession[] {
  if (!weekend) {
    return [];
  }

  return [
    {
      name: "Free Practice 1",
      date: getFullSessionDate(weekend.FirstPractice),
    },
    {
      name: "Free Practice 2",
      date: getFullSessionDate(weekend.SecondPractice),
    },
    {
      name: "Free Practice 3",
      date: getFullSessionDate(weekend.ThirdPractice),
    },
    {
      name: "Qualifying",
      date: getFullSessionDate(weekend.Qualifying),
    },
    {
      name: "Race",
      // The date and time of the race is not a nested object
      date: new Date(`${weekend.date} ${weekend.time}`),
    },
  ];
}
