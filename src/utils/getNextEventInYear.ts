import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";
import { getGrandPrixWeekendSessions } from "./getGrandPrixWeekendSessions";
import isAfter from "date-fns/isAfter";

// Find the first event which has a session in the future
export function getNextEventInYear(schedule: GrandPrixWeekend[]): GrandPrixWeekend | undefined {
  return schedule.find((grandPrixWeekend) => {
    const sessions = getGrandPrixWeekendSessions(grandPrixWeekend);

    // TODO: All these union types with undefined or null are getting out of hand!
    const sessionDates: (Date | null)[] = sessions.map((session) => session.date);

    return sessionDates.some((sessionDate) => sessionDate && isAfter(sessionDate, new Date()));
  });
}
