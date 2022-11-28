import TeamLink from "../Links/TeamLink";
import { Team, TeamSeasonHistory } from "../../server/trpc/router/team";
import SeasonLink from "../Links/SeasonLink";

import styles from "../../styles/Statistic.module.scss";

interface TeamChampionProps {
  team: Team | undefined;
  championshipsWon: TeamSeasonHistory[];
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

      <div className={styles.numChampionships}>
        {props.championshipsWon.length}
      </div>

      <div className={styles.winningYears}>
        {props.championshipsWon.map((championship) => {
          return (
            <SeasonLink
              key={championship.season}
              season={championship.season}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamChampion;
