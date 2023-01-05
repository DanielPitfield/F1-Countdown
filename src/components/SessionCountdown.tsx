import { trpc } from "../utils/trpc";
import { useEffect, useRef, useState } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";

const SessionCountdown = () => {
  const { data: upcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery();

  const upcomingRaceDate = useRef<Date | null>(
    upcomingGrandPrixWeekend?.sessions.gp
      ? new Date(upcomingGrandPrixWeekend.sessions.gp)
      : null
  );

  const [remainingTime, setRemainingTime] = useState<string>(
    getFormattedTimeUntil(upcomingRaceDate.current)
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setRemainingTime(getFormattedTimeUntil(upcomingRaceDate.current)),
      1000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h3>Race Countdown</h3>
      <div>Time until next race: {remainingTime}</div>
    </div>
  );
};

export default SessionCountdown;
