import React, { useState } from "react";
import Image from "next/image";
import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";
import useHighlightedSessionCountdown from "../hooks/useHighlightedSessionCountdown";
import { getGrandPrixWeekendSessions, WeekendSession } from "../utils/getGrandPrixWeekendSessions";
import { add, format, differenceInCalendarDays, isWithinInterval, isSameDay, isAfter } from "date-fns";
import { CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { sessionDurations } from "../data/sessionDurations";

import styles from "../styles/UpcomingWeekendSummary.module.scss";

const override: CSSProperties = {
  display: "flex",
  margin: "0 auto",
};

interface UpcomingWeekendSummaryProps {
  upcomingGrandPrixWeekend: GrandPrixWeekend | null | undefined;
}

const UpcomingWeekendSummary = (props: UpcomingWeekendSummaryProps) => {
  const [showTrackImage, setShowTrackImage] = useState<boolean>(true);

  // All the sessions of the current/upcoming grand prix weekend (which have a known date/time)
  const sessions: WeekendSession[] = getGrandPrixWeekendSessions(props.upcomingGrandPrixWeekend).filter(
    (session) => session.date
  );

  // Is there a session which is currently taking place?
  const ongoingSession: WeekendSession | undefined = sessions.find(
    (session) =>
      session.date &&
      // Is the current date between when the session starts and when it ends?
      isWithinInterval(new Date(), {
        start: session.date,
        // Add on the session duration to the date of when it started
        end: add(session.date, {
          minutes: sessionDurations.find((x) => x.name === session.name)?.minutes ?? 60,
        }),
      })
  );

  // The first session which is in the future
  const upcomingSession: WeekendSession | undefined = sessions.find(
    (session) => session.date && isAfter(session.date, new Date())
  );

  // Show any ongoing session as priority but then the upcoming session as a fallback value
  const highlightedSession: WeekendSession | undefined = ongoingSession ?? upcomingSession;

  // How long until this next session?
  const remainingTime = useHighlightedSessionCountdown(highlightedSession);

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

  // Couldn't find the next session
  if (!highlightedSession) {
    return <div className={styles.wrapper}>No session found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.circuitWrapper}>
        <div className={styles.circuitDetails}>
          <h3 className={styles.raceName}>{props.upcomingGrandPrixWeekend.raceName}</h3>
          <div>{props.upcomingGrandPrixWeekend.Circuit.circuitName}</div>
          <div>{`Round ${props.upcomingGrandPrixWeekend.round}`}</div>
        </div>

        {showTrackImage && (
          <Image
            className={styles.trackImage}
            src={`/Images/tracks/${props.upcomingGrandPrixWeekend.Circuit.circuitId}.svg`}
            width={75}
            height={75}
            alt={props.upcomingGrandPrixWeekend.Circuit.circuitName}
            onError={() => setShowTrackImage(false)}
          />
        )}
      </div>

      <div>
        {sessions.map((session) => {
          // Should the session be highlighted?
          const isHighlightedSession: boolean = session === highlightedSession;

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

            // Not yesterday or tomorrow but is in the near future (this week)
            if (
              session.date &&
              isAfter(session.date, new Date()) &&
              differenceInCalendarDays(session.date, new Date()) < 7
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
              data-is-highlighted={isHighlightedSession}
              data-is-finished={
                session.date &&
                // Current date is after when the session ends (start + duration)
                isAfter(
                  new Date(),
                  add(session.date, {
                    minutes: sessionDurations.find((x) => x.name === session.name)?.minutes ?? 60,
                  })
                )
              }
            >
              <div>{session.name}</div>
              <div>{formattedDate()}</div>
              {isHighlightedSession && <div className={styles.countdown}>{remainingTime ?? "Loading..."}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingWeekendSummary;
