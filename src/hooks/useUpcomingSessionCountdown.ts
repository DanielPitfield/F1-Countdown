import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";
import { trpc } from "../utils/trpc";

function useUpcomingSessionCountdown() {
  const { data: upcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery();

  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>();

  useEffect(() => {
    if (!upcomingGrandPrixWeekend) {
      return;
    }

    // The first session of the upcoming/current grand prix weekend which is in the future
    const upcomingSession: string | undefined = Object.values(
      upcomingGrandPrixWeekend.sessions
    ).find((session) => new Date(session) > new Date());

    if (!upcomingSession) {
      return;
    }

    // Convert the string to a Date object
    const upcomingSessionDate = new Date(upcomingSession);

    const intervalId = setInterval(
      () => setRemainingTime(getFormattedTimeUntil(upcomingSessionDate)),
      1000
    );

    return () => clearInterval(intervalId);
  }, [upcomingGrandPrixWeekend, setRemainingTime]);

  return remainingTime;
}

export default useUpcomingSessionCountdown;
