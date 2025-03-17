import { GrandPrixWeekend, WeekendSession } from "./types/GrandPrix";

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

  // The day of the race is known but the specific times for the sessions have not yet been decided (normally this happens during offseason for the upcoming season)
  if (!weekend.FirstPractice && weekend.date) {
    return [
      {
        name: "Race",
        date: new Date(weekend.date),
      },
    ];
  }

  // Sprint weekend
  if (weekend.SprintQualifying || weekend.Sprint) {
    return [
      {
        name: "Free Practice 1",
        date: getFullSessionDate(weekend.FirstPractice),
      },
      {
        name: "Sprint Qualifying",
        date: getFullSessionDate(weekend.SprintQualifying),
      },
      {
        name: "Sprint",
        date: getFullSessionDate(weekend.Sprint),
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
