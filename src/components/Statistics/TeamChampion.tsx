import styles from "../../styles/Statistic.module.scss";

import type { Team, TeamSeasonResult } from "../../utils/types/Team";
import TeamLink from "../Links/TeamLink";
import SeasonLink from "../Links/SeasonLink";

interface TeamChampionProps {
  team: Team | undefined;
  championshipsWon: TeamSeasonResult[];
}

const TeamChampion = (props: TeamChampionProps) => {
  if (!props.team) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        <TeamLink team={props.team} />
      </div>

      <div className={styles.numChampionships}>{props.championshipsWon.length}</div>

      <div className={styles.winningYears}>
        {props.championshipsWon.map((championship, index) => [
          index > 0 && ", ",
          <SeasonLink key={championship.season} season={championship.season} />,
        ])}
      </div>
    </div>
  );
};

export default TeamChampion;
