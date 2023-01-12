import { DriverStanding } from "../server/trpc/router/statistics";
import DriverLink from "./Links/DriverLink";
import TeamLink from "./Links/TeamLink";

import styles from "../styles/Statistic.module.scss";

interface DriverStandingsProps {
  standings: DriverStanding[] | undefined;
}

const DriverStandings = (props: DriverStandingsProps) => {
  if (!props.standings) {
    return null;
  }

  return (
    <div>
      {props.standings?.map((standing) => {
        return (
          <div key={standing.Driver.driverId} className={styles.wrapper}>
            <div>
              {standing.position}
              <DriverLink driver={standing.Driver} />
              <TeamLink team={standing.Constructors[0]} />
            </div>

            <div>{standing.points}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverStandings;
