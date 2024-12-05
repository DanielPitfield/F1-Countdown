import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";
import { WeekendSession } from "../utils/types/GrandPrix";
import { add, isWithinInterval, hoursToMilliseconds, minutesToMilliseconds } from "date-fns";
import { sessionDurations } from "../data/sessionDurations";

function useHighlightedSessionCountdown(highlightedSession: WeekendSession | undefined) {
  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [countdownPollMs, setCountdownPollMs] = useState<number>(0);

  useEffect(() => {
    if (!highlightedSession) {
      return;
    }

    const isSessionInProgress =
      // The session's date is known
      highlightedSession.date &&
      // The session started before now and has not yet ended
      isWithinInterval(new Date(), {
        start: highlightedSession.date,
        end: add(highlightedSession.date, {
          minutes: sessionDurations.find((x) => x.name === highlightedSession.name)?.minutes ?? 60,
        }),
      });

    // Is the highlighted session currently taking place?
    if (isSessionInProgress) {
      setRemainingTime("NOW (IN PROGRESS)");
      return;
    }

    const intervalId = setInterval(() => {
      const formattedTime = getFormattedTimeUntil(highlightedSession.date);
      setRemainingTime(formattedTime);

      // Check only once every minute when the formatted time is showing hours
      if (formattedTime.includes("hours")) {
        setCountdownPollMs(minutesToMilliseconds(1));
        return;
      }

      // Check once an hour when the formatted time is showing days
      if (formattedTime.includes("days")) {
        setCountdownPollMs(hoursToMilliseconds(1));
        return;
      }

      // Otheriwse, update every second
      setCountdownPollMs(1000);
    }, countdownPollMs);

    return () => clearInterval(intervalId);
  }, [highlightedSession, countdownPollMs, setRemainingTime]);

  return remainingTime;
}

export default useHighlightedSessionCountdown;
