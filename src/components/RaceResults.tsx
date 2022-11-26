import { Race } from "../server/trpc/router/grandPrix";
import DriverLink from "./Links/DriverLink";
import TeamLink from "./Links/TeamLink";

import styles from "../styles/Statistic.module.scss";

interface RaceResultsProps {
  race: Race | undefined;
}

const RaceResults = (props: RaceResultsProps) => {
  if (!props.race) {
    return null;
  }

  return (
    <div>
      {props.race.Results.map((result) => {
        return (
          <div key={result.Driver.driverId} className={styles.wrapper}>
            <div>
              {result.position}
              <DriverLink driver={result.Driver} />
              <TeamLink team={result.Constructor} />
              {result.Time?.time}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RaceResults;
