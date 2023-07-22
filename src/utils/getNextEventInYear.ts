import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";
import { getGrandPrixWeekendSessions } from "./getGrandPrixWeekendSessions";
import isAfter from "date-fns/isAfter";

// Find the first event which has a session in the future
export function getNextEventInYear(schedule: GrandPrixWeekend[]): GrandPrixWeekend | undefined {
  return schedule.find((grandPrixWeekend) => {
    const sessions = getGrandPrixWeekendSessions(grandPrixWeekend);
    const sessionDates: Date[] = sessions.map((session) => session.date).filter((x): x is Date => x != null);

    return sessionDates.some((sessionDate) => sessionDate && isAfter(sessionDate, new Date()));
  });
}
