import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { DriverSeasonHistory } from "../../server/trpc/router/driver";
import DriverChampion from "../../components/Statistics/DriverChampion";

const DriverWorldChampionship: NextPage = () => {
  const { data: history } =
    trpc.statistics.getDriverWorldChampionshipHistory.useQuery();

  if (!history) {
    return null;
  }

  const uniqueWorldChampions = Array.from(
    new Set(history.map((season) => season.DriverStandings[0]?.Driver.driverId))
  );

  // Descending order (of number of championships won)
  uniqueWorldChampions.sort((a, b) => {
    return (
      history.filter(
        (season) => season.DriverStandings[0]?.Driver.driverId === b
      ).length -
      history.filter(
        (season) => season.DriverStandings[0]?.Driver.driverId === a
      ).length
    );
  });

  return (
    <div>
      {uniqueWorldChampions.map((championID) => {
        const championshipsWon: DriverSeasonHistory[] = history.filter(
          (season) => season.DriverStandings[0]?.Driver.driverId === championID
        );

        return (
          <DriverChampion
            key={championID}
            championshipsWon={championshipsWon}
          />
        );
      })}
    </div>
  );
};

export default DriverWorldChampionship;
