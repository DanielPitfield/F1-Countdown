import { TeamSeasonHistory } from "../../server/trpc/router/team";

import styles from "../../styles/Statistic.module.scss";

interface TeamChampionProps {
  championshipsWon: TeamSeasonHistory[];
}

const TeamChampion = (props: TeamChampionProps) => {
  const teamName =
    props.championshipsWon[0]?.ConstructorStandings[0]?.Constructor.name;

  return (
    <div key={teamName} className={styles.wrapper}>
      <div className={styles.name}>{teamName}</div>

      <div className={styles.numChampionships}>
        {props.championshipsWon.length}
      </div>
      
      <div className={styles.winningYears}>
        {`(${props.championshipsWon.map((x) => x.season).join(", ")})`}
      </div>
    </div>
  );
};

export default TeamChampion;
