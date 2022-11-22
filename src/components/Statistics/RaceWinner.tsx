import { RaceHistory } from "../../server/trpc/router/statistics";
import { getDriverName } from "../../utils/getDriverName";

import styles from "../../styles/Statistic.module.scss";

interface RaceWinnerProps {
  racesWon: RaceHistory[];
}

const RaceWinner = (props: RaceWinnerProps) => {
  const driver = props.racesWon[0]?.Results[0]?.Driver;
  const fullName = getDriverName(driver);

  return (
    <div key={fullName} className={styles.wrapper}>
      <div className={styles.name}>{fullName}</div>
      <div className={styles.numRaces}>{props.racesWon.length}</div>
    </div>
  );
};

export default RaceWinner;
