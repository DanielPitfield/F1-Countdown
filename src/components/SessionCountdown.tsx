import { getCurrentYear } from "../utils/getCurrentYear";
import { trpc } from "../utils/trpc";
import { useEffect, useRef, useState } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";

const SessionCountdown = () => {
  const { data: currentYearUpcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery({
      year: getCurrentYear(),
    });

  const { data: nextYearUpcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery({
      year: (parseInt(getCurrentYear()) + 1).toString(),
    });

  function getUpcomingRaceDate(): Date {
    return new Date(
      currentYearUpcomingGrandPrixWeekend?.sessions.gp ??
        nextYearUpcomingGrandPrixWeekend?.sessions.gp ??
        ""
    );
  }

  // TODO: Custom hook?
  const upcomingRaceDate = useRef<Date>(getUpcomingRaceDate());

  const [remainingTime, setRemainingTime] = useState<string>(
    getFormattedTimeUntil(getUpcomingRaceDate())
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setRemainingTime(getFormattedTimeUntil(upcomingRaceDate.current)),
      1000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [upcomingRaceDate]);

  return (
    <div>
      <h3>Race Countdown</h3>
      <div>Time until next race: {remainingTime}</div>
    </div>
  );
};

export default SessionCountdown;
