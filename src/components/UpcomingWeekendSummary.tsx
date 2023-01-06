import React from "react";
import useCountdown from "../hooks/useCountdown";
import { getGrandPrixWeekendSessions } from "../utils/getGrandPrixWeekendSessions";
import { trpc } from "../utils/trpc";

const UpcomingWeekendSummary = () => {
  const { data: upcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery();

  if (!upcomingGrandPrixWeekend) {
    return null;
  }

  const sessions = getGrandPrixWeekendSessions(upcomingGrandPrixWeekend);

  // The first session of the upcoming/current grand prix weekend which is in the future
  const upcomingSession = sessions.find((session) => session.date > new Date());

  // TODO: Should the hook include the logic of finding the next session or just be a countdown to a given date?
  //const remainingTime = useCountdown(upcomingSession?.date);

  // TODO: Also render the remainingTime/countdown next to the session which is upcoming/next
  return (
    <div>
      <h3>Upcoming Grand Prix Weekend</h3>
      <strong>{upcomingGrandPrixWeekend.raceName}</strong>
      <div>{upcomingGrandPrixWeekend.Circuit.circuitName}</div>
      <div>{`Round ${upcomingGrandPrixWeekend.round}`}</div>

      <div>
        {sessions.map((session) => {
          // Both the date and time of the session
          const formattedDate = `${session.date.toLocaleDateString()} (${session.date.toLocaleTimeString()})`;

          return (
            <div
              key={session.name}
              data-is-finished={session.date > new Date()}
            >
              <div>{session.name}</div>
              <div>{formattedDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingWeekendSummary;
