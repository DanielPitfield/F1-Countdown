import TeamChampion from "../../../components/Statistics/TeamChampion";
import { getTeamWorldChampionshipHistory } from "../../../utils/serverActions/statistics/getTeamWorldChampionshipHistory";
import type { TeamSeasonResult } from "../../../utils/types/Team";

export default async function Page() {
  const history = await getTeamWorldChampionshipHistory();

  // The constructorId of every team that has won a world championship
  const teamChampionIDs: string[] = Array.from(
    new Set(history.map((season) => season.teamStanding?.Constructor.constructorId ?? ""))
  ).filter((id) => id !== "");

  // The championships each team has won
  const teamChampionshipMappings = teamChampionIDs
    .map((championID) => {
      const championshipsWon: TeamSeasonResult[] = history.filter(
        (season) => season.teamStanding?.Constructor.constructorId === championID
      );

      return {
        team: championshipsWon[0]?.teamStanding?.Constructor,
        championshipsWon: championshipsWon,
      };
    })
    // Descending order (of number of championships won)
    .sort((a, b) => {
      return b.championshipsWon.length - a.championshipsWon.length;
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
}
