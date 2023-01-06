import React from "react";
import { trpc } from "../utils/trpc";

const UpcomingWeekendSummary = () => {
  const { data: upcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery();

  if (!upcomingGrandPrixWeekend) {
    return null;
  }

  const sessionNameMappings: { key: string; name: string }[] = [
    { key: "fp1", name: "Free Practice 1" },
    { key: "fp2", name: "Free Practice 2" },
    { key: "fp3", name: "Free Practice 3" },
    { key: "qualifying", name: "Qualifying" },
    { key: "gp", name: "Race" },
  ];

  // The first session of the upcoming/current grand prix weekend which is in the future
  // TODO: Render countdown to the next/upcoming session
  const upcomingSession: string | undefined = Object.values(
    upcomingGrandPrixWeekend.sessions
  ).find((session) => new Date(session) > new Date());

  return (
    <div>
      <h3>Upcoming Grand Prix Weekend</h3>
      <strong>{upcomingGrandPrixWeekend.name}</strong>
      <div>{upcomingGrandPrixWeekend.location}</div>
      <div>{`Round ${upcomingGrandPrixWeekend.round}`}</div>

      <div>
        {Object.entries(upcomingGrandPrixWeekend.sessions).map(
          ([key, value]) => {
            const sessionDate: Date = new Date(value);
            // The common name of the session
            const formattedName: string =
              sessionNameMappings.find((mapping) => mapping.key === key)
                ?.name ?? key;
            // Both the date and time of the session
            const formattedDate = `${sessionDate.toLocaleDateString()} (${sessionDate.toLocaleTimeString()})`;

            return (
              <div key={key} data-is-finished={sessionDate > new Date()}>
                <div>{formattedName}</div>
                <div>{formattedDate}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default UpcomingWeekendSummary;
