import styles from "../../styles/Statistic.module.scss";

import type { Driver, DriverSeasonResult } from "../../utils/types/Driver";
import DriverLink from "../Links/DriverLink";
import TeamLink from "../Links/TeamLink";
import SeasonLink from "../Links/SeasonLink";

interface DriverChampionProps {
  driver: Driver | undefined;
  championshipsWon: DriverSeasonResult[];
}

const DriverChampion = (props: DriverChampionProps) => {
  if (!props.driver) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        <DriverLink driver={props.driver} />
      </div>

      <div className={styles.numChampionships}>{props.championshipsWon.length}</div>

      <div className={styles.winningYears}>
        {props.championshipsWon.map((championship, index) => [
          index > 0 && ", ",
          <SeasonLink key={championship.season} season={championship.season} />,
        ])}
      </div>

      <div className={styles.winningYearsTeams}>
        {props.championshipsWon.map((championship, index) => {
          /*
          The teams/cars the driver won their championship(s) with
          e.g (McLaren, Mercedes, Mercedes, Mercedes, Mercedes, Mercedes, Mercedes)
          */
          const team = championship.driverStanding?.Constructors[0];

          return [index > 0 && ", ", <TeamLink key={`${team?.constructorId}-${index}`} team={team} />];
        })}
      </div>
    </div>
  );
};

export default DriverChampion;
