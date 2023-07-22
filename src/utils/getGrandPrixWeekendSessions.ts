import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";

export type SessionName = "Free Practice 1" | "Free Practice 2" | "Sprint" | "Free Practice 3" | "Qualifying" | "Race";
export type WeekendSession = { name: SessionName; date: Date | null };

// Get the date object of a session (using both date and time)
function getFullSessionDate(session: { date: string; time: string } | undefined): Date | null {
  if (!session) {
    return null;
  }

  return new Date(`${session.date} ${session.time}`);
}

export function getGrandPrixWeekendSessions(weekend: GrandPrixWeekend | undefined | null): WeekendSession[] {
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
    weekend.Sprint
      ? {
          name: "Sprint",
          date: getFullSessionDate(weekend.Sprint),
        }
      : undefined,
    weekend.ThirdPractice
      ? {
          name: "Free Practice 3",
          date: getFullSessionDate(weekend.ThirdPractice),
        }
      : undefined,
    {
      name: "Qualifying",
      date: getFullSessionDate(weekend.Qualifying),
    },
    {
      name: "Race",
      // The date and time of the race is not a nested object
      date: new Date(`${weekend.date} ${weekend.time}`),
    },
  ].filter((x): x is WeekendSession => x != undefined);
}
