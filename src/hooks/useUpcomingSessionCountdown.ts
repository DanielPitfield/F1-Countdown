import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";
import { WeekendSession } from "../utils/getGrandPrixWeekendSessions";

function useUpcomingSessionCountdown(
  upcomingSession: WeekendSession | undefined
) {
  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>();

  useEffect(() => {
    if (!upcomingSession) {
      return;
    }

    const intervalId = setInterval(
      () => setRemainingTime(getFormattedTimeUntil(upcomingSession.date)),
      1000
    );

    return () => clearInterval(intervalId);
  }, [upcomingSession, setRemainingTime]);

  return remainingTime;
}

export default useUpcomingSessionCountdown;
