import { Race } from "../server/trpc/router/grandPrix";
import DriverLink from "./Links/DriverLink";
import TeamLink from "./Links/TeamLink";

import styles from "../styles/Statistic.module.scss";

interface RaceResultsProps {
  race: Race | undefined;
  showPositions: boolean;
  showTeams: boolean;
  showTimes: boolean;
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
              {props.showPositions && <span>{result.position}</span>}
              <DriverLink driver={result.Driver} />
              {props.showTeams && <TeamLink team={result.Constructor} />}
              {props.showTimes && <span>{result.Time?.time ?? ""}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RaceResults;
