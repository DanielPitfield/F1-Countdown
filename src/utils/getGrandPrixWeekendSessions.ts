import { add, sub } from "date-fns";
import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";

export type SessionName =
  | "Free Practice 1"
  | "Free Practice 2"
  | "Free Practice 3"
  | "Sprint Shootout"
  | "Qualifying"
  | "Sprint"
  | "Race";

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

  // Sprint weekend
  if (weekend.Sprint) {
    // The sprint shootout date is put under SecondPractice and is +30 minutes off
    // http://ergast.com/mrd/bugs/comment-page-15/
    const sprintShootoutDate = ((): Date => {
      // Try to find the sprint shootout date/time under SecondPractice
      const sessionDate = getFullSessionDate(weekend.SecondPractice);

      // Account for being 30 minutes later than when the session actually starts
      if (sessionDate) {
        return sub(sessionDate, {
          minutes: 30,
        });
      }

      // Otherwise ~19 hours after qualifying (so around ~5 hours earlier on the next day)
      return add(new Date(`${weekend.Qualifying.date} ${weekend.Qualifying.time}`), { hours: 19 });
    })();

    return [
      {
        name: "Free Practice 1",
        date: getFullSessionDate(weekend.FirstPractice),
      },
      {
        name: "Qualifying",
        date: getFullSessionDate(weekend.Qualifying),
      },
      {
        name: "Sprint Shootout",
        date: sprintShootoutDate,
      },
      {
        name: "Sprint",
        date: getFullSessionDate(weekend.Sprint),
      },
      {
        name: "Race",
        // The date and time of the race is not a nested object
        date: new Date(`${weekend.date} ${weekend.time}`),
      },
    ];
  }

  // Normal weekend
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
