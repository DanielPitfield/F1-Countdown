import { DriverSeasonHistory } from "../server/trpc/router/driver";

import styles from "../../styles/statistics/DriverChampion.module.scss";

interface DriverChampionProps {
  championshipsWon: DriverSeasonHistory[];
}

const DriverChampion = (props: DriverChampionProps) => {
  const driver = props.championshipsWon[0]?.DriverStandings[0]?.Driver;
  const fullName = `${driver?.givenName} ${driver?.familyName}`;

  return (
    <div key={fullName} className={styles.wrapper}>
      <div className={styles.name}>{fullName}</div>
      <div className={styles.numChampionships}>
        {props.championshipsWon.length}
      </div>
      <div className={styles.winningYears}>
        {`(${props.championshipsWon.map((x) => x.season).join(", ")})`}
      </div>
      <div className={styles.winningYearsTeams}>
        {`(${props.championshipsWon
          .map((x) => x.DriverStandings[0]?.Constructors[0]?.name)
          .join(", ")})`}
      </div>
    </div>
  );
};

export default DriverChampion;
