import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { TeamSeasonHistory } from "../../server/trpc/router/team";
import TeamChampion from "../../components/Statistics/TeamChampion";

import styles from "../../styles/statistics/TeamWorldChampionship.module.scss";


const TeamWorldChampionship: NextPage = () => {
  const { data: history } =
    trpc.statistics.getTeamWorldChampionshipHistory.useQuery();

  if (!history) {
    return null;
  }

  const uniqueWorldChampions = Array.from(
    new Set(
      history.map(
        (season) => season.ConstructorStandings[0]?.Constructor.constructorId
      )
    )
  );

  // Descending order (of number of championships won)
  uniqueWorldChampions.sort((a, b) => {
    return (
      history.filter(
        (season) =>
          season.ConstructorStandings[0]?.Constructor.constructorId === b
      ).length -
      history.filter(
        (season) =>
          season.ConstructorStandings[0]?.Constructor.constructorId === a
      ).length
    );
  });

  return (
    <div className={styles.wrapper}>
      {uniqueWorldChampions.map((championID) => {
        const championshipsWon: TeamSeasonHistory[] = history.filter(
          (season) =>
            season.ConstructorStandings[0]?.Constructor.constructorId ===
            championID
        );

        return (
          <TeamChampion key={championID} championshipsWon={championshipsWon} />
        );
      })}
    </div>
  );
};

export default TeamWorldChampionship;
