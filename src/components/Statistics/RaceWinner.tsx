import Link from "next/link";
import { getDriverName } from "../../utils/getDriverName";
import { RaceInfo } from "../../server/trpc/router/race";

import styles from "../../styles/Statistic.module.scss";

interface RaceWinnerProps {
  racesWon: RaceInfo[];
}

const RaceWinner = (props: RaceWinnerProps) => {
  const driver = props.racesWon[0]?.Results[0]?.Driver;

  return (
    <div key={driver?.driverId} className={styles.wrapper}>
      <div className={styles.name}>
        <Link href={`/driverProfiles/${driver?.driverId}`}>
          {getDriverName(driver)}
        </Link>
      </div>

      <div className={styles.numRaces}>{props.racesWon.length}</div>
    </div>
  );
};

export default RaceWinner;
