import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";
import { WeekendSession } from "../utils/types/GrandPrix";
import { add, isWithinInterval, hoursToMilliseconds, minutesToMilliseconds } from "date-fns";
import { sessionDurations } from "../data/sessionDurations";

function useHighlightedSessionCountdown(highlightedSession: WeekendSession | undefined) {
  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [countdownPollMs, SetCountdownPollMs] = useState<number>(0);

  useEffect(() => {
    if (!highlightedSession) {
      return;
    }

    // Is the highlighted session currently taking place?
    if (
      highlightedSession.date &&
      isWithinInterval(new Date(), {
        start: highlightedSession.date,
        end: add(highlightedSession.date, {
          minutes: sessionDurations.find((x) => x.name === highlightedSession.name)?.minutes ?? 60,
        }),
      })
    ) {
      setRemainingTime("NOW (IN PROGRESS)");
      return;
    }

    const intervalId = setInterval(() => {
      const formattedTime = getFormattedTimeUntil(highlightedSession.date);
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
  }, [highlightedSession, countdownPollMs, setRemainingTime]);

  return remainingTime;
}

export default useHighlightedSessionCountdown;
