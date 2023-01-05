import { trpc } from "../utils/trpc";
import { useEffect, useRef, useState } from "react";
import { getFormattedTimeUntil } from "../utils/getFormattedTimeUntil";

const SessionCountdown = () => {
  const { data: upcomingGrandPrixWeekend } =
    trpc.home.getUpcomingGrandPrixWeekend.useQuery();

  const [remainingTime, setRemainingTime] = useState<string>();

  useEffect(() => {
    if (!upcomingGrandPrixWeekend) {
      return;
    }

    const upcomingRaceDate = new Date(upcomingGrandPrixWeekend.sessions.gp);

    const intervalId = setInterval(
      () => setRemainingTime(getFormattedTimeUntil(upcomingRaceDate)),
      1000
    );

    return () => clearInterval(intervalId);
  }, [upcomingGrandPrixWeekend, setRemainingTime]);

  return (
    <div>
      <h3>Race Countdown</h3>
      <div>
        Time until next race:<br/>
        {remainingTime ? remainingTime : <em>Loading...</em>}
      </div>
    </div>
  );
};

export default SessionCountdown;
