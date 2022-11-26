import { Qualifying } from "../server/trpc/router/grandPrix";
import DriverLink from "./Links/DriverLink";
import TeamLink from "./Links/TeamLink";

import styles from "../styles/Statistic.module.scss";

interface QualifyingResultsProps {
  qualifying: Qualifying | undefined;
}

const QualifyingResults = (props: QualifyingResultsProps) => {
  if (!props.qualifying) {
    return null;
  }

  // TODO: Show fastest time or furthest session time for leaderboard?

  return (
    <div>
      {props.qualifying.QualifyingResults.map((result) => {
        return (
          <div key={result.Driver.driverId} className={styles.wrapper}>
            <div>
              {result.position}
              <DriverLink driver={result.Driver} />
              <TeamLink team={result.Constructor} />
              {result.Q3 ?? result.Q2 ?? result.Q1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QualifyingResults;
