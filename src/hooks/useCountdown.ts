import { useState, useEffect } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";

function useCountdown(endDate: Date) {
  // The formatted time until the next session
  const [remainingTime, setRemainingTime] = useState<string>();

  useEffect(() => {
    const intervalId = setInterval(
      () => setRemainingTime(getFormattedTimeUntil(endDate)),
      1000
    );

    return () => clearInterval(intervalId);
  }, [endDate, setRemainingTime]);

  return remainingTime;
}

export default useCountdown;
