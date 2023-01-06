import useNextSessionCountdown from "../hooks/useUpcomingSessionCountdown";

const SessionCountdown = () => {
  const remainingTime = useNextSessionCountdown();

  return (
    <div>
      <h3>Session Countdown</h3>
      <div>
        Time until next session:
        <br />
        {remainingTime ?? <em>Loading...</em>}
      </div>
    </div>
  );
};

export default SessionCountdown;
