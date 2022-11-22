import { DriverStanding as DriverStandings } from "../../server/trpc/router/statistics";

import styles from "../../styles/statistics/DriverChampion.module.scss";

interface DriverStandingsProps {
  standings: DriverStandings[];
}

const DriverStandings = (props: DriverStandingsProps) => {
  return (
    <div>
      {props.standings?.map((standing) => {
        const driver = standing.Driver;
        const fullName = `${driver?.givenName} ${driver?.familyName}`;
        
        return (
          <div key={standing.Driver.driverId} className={styles.wrapper}>
            <div>{`${standing.position} ${fullName} (${standing.Constructors[0]?.name})`}</div>
            <div>{standing.points}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverStandings;
