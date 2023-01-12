import React from "react";
import useUpcomingSessionCountdown from "../hooks/useUpcomingSessionCountdown";
import {
  getGrandPrixWeekendSessions,
  WeekendSession,
} from "../utils/getGrandPrixWeekendSessions";

import styles from "../styles/UpcomingWeekendSummary.module.scss";
import { trpc } from "../utils/trpc";

const UpcomingWeekendSummary = () => {
  const { data: upcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery();

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

  if (!upcomingGrandPrixWeekend) {
    return (
      <div className={styles.wrapper}>
        <h3>Upcoming Grand Prix Weekend</h3>
        <div>Offseason</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3>Upcoming Grand Prix Weekend</h3>
      <strong>{upcomingGrandPrixWeekend.raceName}</strong>
      <div>{upcomingGrandPrixWeekend.Circuit.circuitName}</div>
      <div>{`Round ${upcomingGrandPrixWeekend.round}`}</div>

      <div>
        {sessions.map((session) => {
          // Is the next upcoming session (the session for which the countdown should be displayed for)
          const isUpcomingSession: boolean = session === upcomingSession;
          // Both the date and time of the session
          const formattedDate = `${session.date?.toLocaleDateString()} (${session.date?.toLocaleTimeString()})`;

          return (
            <div
              className={styles.session}
              key={session.name}
              data-is-upcoming={isUpcomingSession}
              data-is-finished={session.date && session.date < new Date()}
            >
              <div>{session.name}</div>
              <div>{formattedDate}</div>
              {isUpcomingSession && (
                <div className={styles.countdown}>{remainingTime}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingWeekendSummary;
