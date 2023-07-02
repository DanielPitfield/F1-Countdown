import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";
import { WeekendSession } from "../utils/getGrandPrixWeekendSessions";
import { hoursToMilliseconds, minutesToMilliseconds } from "date-fns";

function useUpcomingSessionCountdown(
  upcomingSession: WeekendSession | undefined
) {
  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [countdownPollMs, SetCountdownPollMs] = useState<number>(1000);

  useEffect(() => {
    if (!upcomingSession) {
      return;
    }

    const intervalId = setInterval(() => {
      const formattedTime = getFormattedTimeUntil(upcomingSession.date); 
      
      // Only check once a day when the formatted time shows days (and not hours)
      if (formattedTime.includes("days") && !formattedTime.includes("hours")) {
        SetCountdownPollMs(hoursToMilliseconds(24));
      }

      // Only check once an hour when the formatted time shows hours
      if (formattedTime.includes("hours")) {
        SetCountdownPollMs(hoursToMilliseconds(1));
      }

      // Only check once a minute when the formatted time shows minutes
      if (formattedTime.includes("minutes")) {
        SetCountdownPollMs(minutesToMilliseconds(1));
      }     

      setRemainingTime(formattedTime);
    }, countdownPollMs);

    return () => clearInterval(intervalId);
  }, [upcomingSession, countdownPollMs, setRemainingTime]);

  return remainingTime;
}

export default useUpcomingSessionCountdown;
