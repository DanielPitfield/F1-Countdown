import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { DriverSeasonResult } from "../../server/trpc/router/driver";
import DriverChampion from "../../components/Statistics/DriverChampion";

const DriverWorldChampionship: NextPage = () => {
  const { data: history } =
    trpc.statistics.getDriverWorldChampionshipHistory.useQuery();

  if (!history) {
    return null;
  }

  // The driverId of every driver that has won a world championship
  const driverChampionIDs: string[] = Array.from(
    new Set(
      history.map((season) => season.DriverStandings[0]?.Driver.driverId ?? "")
    )
  ).filter((id) => id !== "");

  // The championships each driver has won
  const driverChampionshipMappings = driverChampionIDs
    .map((championID) => {
      const championshipsWon: DriverSeasonResult[] = history.filter(
        (season) => season.DriverStandings[0]?.Driver.driverId === championID
      );

      return {
        driver: championshipsWon[0]?.DriverStandings[0]?.Driver,
        championshipsWon: championshipsWon,
      };
    })
    // Descending order (of number of championships won)
    .sort((a, b) => {
      return a.championshipsWon.length - b.championshipsWon.length;
    });

  return (
    <div>
      {driverChampionshipMappings.map((driverChampionshipMapping) => {
        return (
          <DriverChampion
            key={driverChampionshipMapping.driver?.driverId}
            driver={driverChampionshipMapping.driver}
            championshipsWon={driverChampionshipMapping.championshipsWon}
          />
        );
      })}
    </div>
  );
};

export default DriverWorldChampionship;
