import styles from "../../styles/Statistic.module.scss";

import type { Race } from "../../utils/types/GrandPrix";
import DriverLink from "../Links/DriverLink";

interface RaceWinnerProps {
  racesWon: Race[];
}

const RaceWinner = (props: RaceWinnerProps) => {
  const driver = props.racesWon[0]?.Results[0]?.Driver;

  return (
    <div key={driver?.driverId} className={styles.wrapper}>
      <div className={styles.name}>
        <DriverLink driver={driver} />
      </div>

      <div className={styles.numRaces}>{props.racesWon.length}</div>
    </div>
  );
};

export default RaceWinner;
