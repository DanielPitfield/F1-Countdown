import styles from "../styles/statistics/driverWorldChampion.module.scss";

import { SeasonResult } from "./DriverWorldChampionshipStatistics";

interface WorldChampionshipStatisticProps {
  fullName: string;
  championshipsWon: SeasonResult[];
}

const WorldChampionshipStatistic = (props: WorldChampionshipStatisticProps) => {
  return (
    <div key={props.fullName} className={styles.wrapper}>
      <div className={styles.name}>{props.fullName}</div>
      <div className={styles.numChampionships}>
        {props.championshipsWon.length}
      </div>
      <div className={styles.winningYears}>
        {props.championshipsWon.map((season) => season.year).join(" , ")}
      </div>
    </div>
  );
};

export default WorldChampionshipStatistic;
