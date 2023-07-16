import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";
import { WeekendSession } from "../utils/getGrandPrixWeekendSessions";
import { hoursToMilliseconds, minutesToMilliseconds } from "date-fns";

function useUpcomingSessionCountdown(upcomingSession: WeekendSession | undefined) {
  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [countdownPollMs, SetCountdownPollMs] = useState<number>(0);

  useEffect(() => {
    if (!upcomingSession) {
      return;
    }

    const intervalId = setInterval(() => {
      const formattedTime = getFormattedTimeUntil(upcomingSession.date);
      setRemainingTime(formattedTime);

      // Check only once every minute when the formatted times is showing hours
      if (formattedTime.includes("hours")) {
        SetCountdownPollMs(minutesToMilliseconds(1));
        return;
      }

      // Check once an hour when the formatted time is showing days
      if (formattedTime.includes("days")) {
        SetCountdownPollMs(hoursToMilliseconds(1));
        return;
      }

      // Otheriwse, update every second
      SetCountdownPollMs(1000);
    }, countdownPollMs);

    return () => clearInterval(intervalId);
  }, [upcomingSession, countdownPollMs, setRemainingTime]);

  return remainingTime;
}

export default useUpcomingSessionCountdown;
