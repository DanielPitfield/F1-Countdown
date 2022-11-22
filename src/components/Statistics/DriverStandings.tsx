import { DriverStanding } from "../../server/trpc/router/statistics";
import { getDriverName } from "../../utils/getDriverName";
import Link from "next/link";

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
            <div>
              {standing.position}

              <Link href={`/driverProfiles/${standing.Driver.driverId}`}>
                {getDriverName(standing.Driver)}
              </Link>

              <Link
                href={`/teamProfiles/${standing.Constructors[0]?.constructorId}`}
              >
                {`(${standing.Constructors[0]?.name})`}
              </Link>
            </div>

            <div>{standing.points}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverStandings;
