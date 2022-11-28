import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { TeamSeasonHistory } from "../../server/trpc/router/team";
import TeamChampion from "../../components/Statistics/TeamChampion";

const TeamWorldChampionship: NextPage = () => {
  const { data: history } =
    trpc.statistics.getTeamWorldChampionshipHistory.useQuery();

  if (!history) {
    return null;
  }

  // The constructorId of every team that has won a world championship
  const teamChampionIDs: string[] = Array.from(
    new Set(
      history.map(
        (season) =>
          season.ConstructorStandings[0]?.Constructor.constructorId ?? ""
      )
    )
  ).filter((id) => id !== "");

  // The championships each team has won
  const teamChampionshipMappings = teamChampionIDs
    .map((championID) => {
      const championshipsWon: TeamSeasonHistory[] = history.filter(
        (season) =>
          season.ConstructorStandings[0]?.Constructor.constructorId ===
          championID
      );

      return {
        team: championshipsWon[0]?.ConstructorStandings[0]?.Constructor,
        championshipsWon: championshipsWon,
      };
    })
    // Descending order (of number of championships won)
    .sort((a, b) => {
      return a.championshipsWon.length - b.championshipsWon.length;
    });

  return (
    <div>
      {teamChampionshipMappings.map((teamChampionshipMapping) => {
        return (
          <TeamChampion
            key={teamChampionshipMapping.team?.constructorId}
            team={teamChampionshipMapping.team}
            championshipsWon={teamChampionshipMapping.championshipsWon}
          />
        );
      })}
    </div>
  );
};

export default TeamWorldChampionship;
