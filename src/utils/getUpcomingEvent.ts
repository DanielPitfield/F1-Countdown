import { add, isAfter } from "date-fns";
import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";
import { WeekendSession, getGrandPrixWeekendSessions } from "./getGrandPrixWeekendSessions";
import { sessionDurations } from "../data/sessionDurations";

export function getUpcomingEvent(schedule: GrandPrixWeekend[]): GrandPrixWeekend | undefined {
  // The first upcoming event within the entire schedule
  return schedule.find((grandPrixWeekend) => {
    const sessions: WeekendSession[] = getGrandPrixWeekendSessions(grandPrixWeekend);

    // Which has a session ongoing or in the future
    return sessions.some(
      (session) =>
        session.date &&
        isAfter(
          add(session.date, {
            minutes: sessionDurations.find((x) => x.name === session.name)?.minutes ?? 60,
          }),
          new Date()
        )
    );
  });
}
