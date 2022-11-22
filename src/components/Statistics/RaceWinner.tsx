import Link from "next/link";
import { RaceHistory } from "../../server/trpc/router/statistics";
import { getDriverName } from "../../utils/getDriverName";

import styles from "../../styles/Statistic.module.scss";

interface RaceWinnerProps {
  racesWon: RaceHistory[];
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
