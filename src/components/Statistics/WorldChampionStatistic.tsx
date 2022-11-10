import styles from "../styles/statistics/driverWorldChampion.module.scss";

import { SeasonResult } from "./DriverWorldChampionshipStatistics";

interface WorldChampionshipStatisticProps {
  championshipsWon: SeasonResult[];
}

const WorldChampionshipStatistic = (props: WorldChampionshipStatisticProps) => {
  const fullName = props.championshipsWon[0]?.winningDriverFullName;

  return (
    <div key={fullName} className={styles.wrapper}>
      <div className={styles.name}>{fullName}</div>
      <div className={styles.numChampionships}>
        {props.championshipsWon.length}
      </div>
      <div className={styles.winningYears}>
        {`(${props.championshipsWon.map((season) => season.year).join(", ")})`}
      </div>
      <div className={styles.winningYearsTeams}>
        {`(${props.championshipsWon
          .map((season) => season.winningDriverTeam)
          .join(", ")})`}
      </div>
    </div>
  );
};

export default WorldChampionshipStatistic;
