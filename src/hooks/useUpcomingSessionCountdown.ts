import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";
import { WeekendSession } from "../utils/getGrandPrixWeekendSessions";

function useUpcomingSessionCountdown(
  upcomingSession: WeekendSession | undefined
) {
  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>("");

  useEffect(() => {
    if (!upcomingSession) {
      return;
    }

    const intervalId = setInterval(
      () => setRemainingTime(getFormattedTimeUntil(upcomingSession.date)),
      // TODO: If the countdown is still counting in days (not showing hours), check less often
      1000
    );

    return () => clearInterval(intervalId);
  }, [upcomingSession, setRemainingTime]);

  return remainingTime;
}

export default useUpcomingSessionCountdown;
