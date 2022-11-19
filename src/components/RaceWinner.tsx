import { RaceHistory } from "../server/trpc/router/statistics";

import styles from "../styles/statistics/DriverChampion.module.scss";

interface RaceWinnerProps {
  racesWon: RaceHistory[];
}

const RaceWinner = (props: RaceWinnerProps) => {
  const driver = props.racesWon[0]?.Results[0]?.Driver;
  const fullName = `${driver?.givenName} ${driver?.familyName}`;

  return (
    <div key={fullName} className={styles.wrapper}>
      <div className={styles.name}>{fullName}</div>
      <div className={styles.numChampionships}>{props.racesWon.length}</div>
    </div>
  );
};

export default RaceWinner;
