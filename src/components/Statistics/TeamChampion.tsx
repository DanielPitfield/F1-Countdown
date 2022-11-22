import Link from "next/link";
import { TeamSeasonHistory } from "../../server/trpc/router/team";

import styles from "../../styles/Statistic.module.scss";

interface TeamChampionProps {
  championshipsWon: TeamSeasonHistory[];
}

const TeamChampion = (props: TeamChampionProps) => {
  const team = props.championshipsWon[0]?.ConstructorStandings[0]?.Constructor;

  return (
    <div key={team?.constructorId} className={styles.wrapper}>
      <div className={styles.name}>
        <Link href={`/teamProfiles/${team?.constructorId}`}>{team?.name}</Link>
      </div>

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
