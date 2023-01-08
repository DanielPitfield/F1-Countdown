import React from "react";
import useUpcomingSessionCountdown from "../hooks/useUpcomingSessionCountdown";
import {
  getGrandPrixWeekendSessions,
  WeekendSession,
} from "../utils/getGrandPrixWeekendSessions";
import { getUpcomingGrandPrixWeekend } from "../utils/getUpcomingGrandPrixWeekend";

const UpcomingWeekendSummary = () => {
  // TODO: Ideally this would be a tRPC procedure, not a function
  const upcomingGrandPrixWeekend = getUpcomingGrandPrixWeekend();

  // All the sessions of the current/upcoming grand prix weekend
  const sessions: WeekendSession[] = getGrandPrixWeekendSessions(
    upcomingGrandPrixWeekend
  );

  // The first session which is in the future
  const upcomingSession: WeekendSession | undefined = sessions.find(
    (session) => session.date && session.date > new Date()
  );
  // How long until this next session?
  const remainingTime = useUpcomingSessionCountdown(upcomingSession);

  return (
    <div>
      <h3>Upcoming Grand Prix Weekend</h3>
      <strong>{upcomingGrandPrixWeekend?.raceName}</strong>
      <div>{upcomingGrandPrixWeekend?.Circuit.circuitName}</div>
      <div>{`Round ${upcomingGrandPrixWeekend?.round}`}</div>

      <div>
        {sessions.map((session) => {
          // Both the date and time of the session
          const formattedDate = `${session.date?.toLocaleDateString()} (${session.date?.toLocaleTimeString()})`;

          return (
            <div
              key={session.name}
              data-is-finished={session.date && session.date > new Date()}
            >
              <div>{session.name}</div>
              <div>{formattedDate}</div>
              {session === upcomingSession && <div>{remainingTime}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingWeekendSummary;
