import Link from "next/link";
import { DriverSeasonHistory } from "../../server/trpc/router/driver";
import { getDriverName } from "../../utils/getDriverName";

import styles from "../../styles/Statistic.module.scss";

interface DriverChampionProps {
  championshipsWon: DriverSeasonHistory[];
}

const DriverChampion = (props: DriverChampionProps) => {
  const driver = props.championshipsWon[0]?.DriverStandings[0]?.Driver;

  return (
    <div key={driver?.driverId} className={styles.wrapper}>
      <div className={styles.name}>
        <Link href={`/driverProfiles/${driver?.driverId}`}>
          {getDriverName(driver)}
        </Link>
      </div>

      <div className={styles.numChampionships}>
        {props.championshipsWon.length}
      </div>

      <div className={styles.winningYears}>
        {`(${props.championshipsWon.map((x) => x.season).join(", ")})`}
      </div>

      <div className={styles.winningYearsTeams}>
        {props.championshipsWon.map((x) => {
          const team = x.DriverStandings[0]?.Constructors[0];

          return (
            <Link
              key={team?.constructorId}
              href={`/teamProfiles/${team?.constructorId}`}
            >
              {team?.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DriverChampion;
