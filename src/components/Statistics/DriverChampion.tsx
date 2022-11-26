import DriverLink from "../Links/DriverLink";
import TeamLink from "../Links/TeamLink";
import { DriverSeasonHistory } from "../../server/trpc/router/driver";

import styles from "../../styles/Statistic.module.scss";

interface DriverChampionProps {
  championshipsWon: DriverSeasonHistory[];
}

const DriverChampion = (props: DriverChampionProps) => {
  const driver = props.championshipsWon[0]?.DriverStandings[0]?.Driver;

  return (
    <div key={driver?.driverId} className={styles.wrapper}>
      <div className={styles.name}>
        <DriverLink driver={driver} />
      </div>

      <div className={styles.numChampionships}>
        {props.championshipsWon.length}
      </div>

      <div className={styles.winningYears}>
        {`(${props.championshipsWon
          .map((championship) => championship.season)
          .join(", ")})`}
      </div>

      <div className={styles.winningYearsTeams}>
        {props.championshipsWon.map((championship, index) => {
          const team = championship.DriverStandings[0]?.Constructors[0];
          return <TeamLink key={`${team?.constructorId}-${index}`} team={team} />;
        })}
      </div>
    </div>
  );
};

export default DriverChampion;
