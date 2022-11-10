import { trpc } from "../../utils/trpc";
import { TeamSeasonHistory } from "../../server/trpc/router/team";
import TeamChampion from "./TeamChampion";

import styles from "../../styles/statistics/TeamWorldChampionship.module.scss";

const TeamWorldChampionship = () => {
  const { data: history } =
    trpc.statistics.getTeamWorldChampionshipHistory.useQuery();

  if (!history) {
    return null;
  }

  const uniqueWorldChampions = Array.from(
    new Set(history.map((season) => season.ConstructorStandings[0]?.Constructor.constructorID))
  );

  // Descending order (of number of championships won)
  uniqueWorldChampions.sort((a, b) => {
    return (
      history.filter(
        (season) => season.ConstructorStandings[0]?.Constructor.constructorID === b
      ).length -
      history.filter(
        (season) => season.ConstructorStandings[0]?.Constructor.constructorID === a
      ).length
    );
  });

  return (
    <div className={styles.wrapper}>
      {uniqueWorldChampions.map((championID) => {
        const championshipsWon: TeamSeasonHistory[] = history.filter(
          (season) => season.ConstructorStandings[0]?.Constructor.constructorID === championID
        );

        return (
          <TeamChampion
            key={championID}
            championshipsWon={championshipsWon}
          />
        );
      })}
    </div>
  );
};

export default TeamWorldChampionship;
