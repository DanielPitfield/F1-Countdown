import React from "react";
import Image from "next/image";
import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";
import useUpcomingSessionCountdown from "../hooks/useUpcomingSessionCountdown";
import { getGrandPrixWeekendSessions, WeekendSession } from "../utils/getGrandPrixWeekendSessions";
import isBefore from "date-fns/isBefore";
import { differenceInCalendarDays, format, isSameDay } from "date-fns";
import isAfter from "date-fns/isAfter";
import { CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import styles from "../styles/UpcomingWeekendSummary.module.scss";

const override: CSSProperties = {
  display: "flex",
  margin: "0 auto",
};

interface UpcomingWeekendSummaryProps {
  upcomingGrandPrixWeekend: GrandPrixWeekend | null | undefined;
}

const UpcomingWeekendSummary = (props: UpcomingWeekendSummaryProps) => {
  // All the sessions of the current/upcoming grand prix weekend (which have a known date/time)
  const sessions: WeekendSession[] = getGrandPrixWeekendSessions(props.upcomingGrandPrixWeekend).filter(
    (session) => session.date
  );

  // The first session which is in the future
  const upcomingSession: WeekendSession | undefined = sessions.find(
    (session) => session.date && isAfter(session.date, new Date())
  );
  // How long until this next session?
  const remainingTime = useUpcomingSessionCountdown(upcomingSession);

  // Hasn't fetched yet (loading)
  if (props.upcomingGrandPrixWeekend === undefined) {
    return (
      <div className={styles.wrapper}>
        <BounceLoader
          color={"#888"}
          loading={true}
          cssOverride={override}
          size={100}
          speedMultiplier={0.3}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  // Couldn't find the next event
  if (props.upcomingGrandPrixWeekend === null) {
    return <div className={styles.wrapper}>Offseason</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.circuitWrapper}>
        <div className={styles.circuitDetails}>
          <h3 className={styles.raceName}>{props.upcomingGrandPrixWeekend.raceName}</h3>
          <div>{props.upcomingGrandPrixWeekend.Circuit.circuitName}</div>
          <div>{`Round ${props.upcomingGrandPrixWeekend.round}`}</div>
        </div>

        <Image
          className={styles.trackImage}
          src={`/Images/tracks/${props.upcomingGrandPrixWeekend.Circuit.circuitId}.svg`}
          width={75}
          height={75}
          alt={props.upcomingGrandPrixWeekend.Circuit.circuitName}
        />
      </div>

      <div>
        {sessions.map((session) => {
          // Is the session the next upcoming session? (the session for which the countdown should be displayed for)
          const isUpcomingSession: boolean = session === upcomingSession;

          const formattedDate = () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            // If the session was yesterday
            if (session.date && isSameDay(session.date, yesterday)) {
              return `YESTERDAY (${session.date?.toLocaleTimeString([], {
                timeStyle: "short",
              })})`;
            }

            // If the session is today
            if (session.date && isSameDay(session.date, new Date())) {
              return `TODAY (${session.date?.toLocaleTimeString([], {
                timeStyle: "short",
              })})`;
            }

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            // If the session is tomorrow
            if (session.date && isSameDay(session.date, tomorrow)) {
              return `TOMORROW (${session.date?.toLocaleTimeString([], {
                timeStyle: "short",
              })})`;
            }

            // Not yesterday or tomorrow but is in the near future (next 4 days)
            if (
              session.date &&
              isAfter(session.date, new Date()) &&
              differenceInCalendarDays(session.date, new Date()) <= 4
            ) {
              // The day of the week (e.g SUNDAY) followed by the time of the session
              return `${format(session.date, "EEEE").toUpperCase()} (${session.date?.toLocaleTimeString([], {
                timeStyle: "short",
              })})`;
            }

            // Both the date and time of the session
            return `${session.date?.toLocaleDateString()} (${session.date?.toLocaleTimeString([], {
              timeStyle: "short",
            })})`;
          };

          return (
            <div
              className={styles.session}
              key={session.name}
              data-is-upcoming={isUpcomingSession}
              data-is-finished={session.date && isBefore(session.date, new Date())}
            >
              <div>{session.name}</div>
              <div>{formattedDate()}</div>
              {isUpcomingSession && <div className={styles.countdown}>{remainingTime ?? "Loading..."}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingWeekendSummary;
