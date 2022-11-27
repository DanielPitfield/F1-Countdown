import TeamLink from "../Links/TeamLink";
import { TeamSeasonHistory } from "../../server/trpc/router/team";
import SeasonLink from "../Links/SeasonLink";

import styles from "../../styles/Statistic.module.scss";

interface TeamChampionProps {
  championshipsWon: TeamSeasonHistory[];
}

const TeamChampion = (props: TeamChampionProps) => {
  const team = props.championshipsWon[0]?.ConstructorStandings[0]?.Constructor;

  return (
    <div key={team?.constructorId} className={styles.wrapper}>
      <div className={styles.name}>
        <TeamLink team={team} />
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
