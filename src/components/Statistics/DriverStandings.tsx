import { DriverStanding } from "../../server/trpc/router/statistics";
import { getDriverName } from "../../utils/getDriverName";

import styles from "../../styles/Statistic.module.scss";

interface DriverStandingsProps {
  standings: DriverStanding[];
}

const DriverStandings = (props: DriverStandingsProps) => {
  return (
    <div>
      {props.standings?.map((standing) => {
        return (
          <div key={standing.Driver.driverId} className={styles.wrapper}>
            <div>{`${standing.position} ${getDriverName(standing.Driver)} (${
              standing.Constructors[0]?.name
            })`}</div>
            <div>{standing.points}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverStandings;
