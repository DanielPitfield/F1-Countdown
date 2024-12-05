import DriverChampion from "../../../components/Statistics/DriverChampion";
import { getDriverWorldChampionshipHistory } from "../../../utils/serverActions/statistics/getDriverWorldChampionshipHistory";
import type { DriverSeasonResult } from "../../../utils/types/Driver";

export default async function Page() {
  const history = await getDriverWorldChampionshipHistory();

  // The driverId of every driver that has won a world championship
  const driverChampionIDs: string[] = Array.from(
    new Set(history.map((season) => season.driverStanding.Driver.driverId ?? ""))
  ).filter((id) => id !== "");

  // The championships each driver has won
  const driverChampionshipMappings = driverChampionIDs
    .map((championID) => {
      const championshipsWon: DriverSeasonResult[] = history.filter(
        (season) => season.driverStanding.Driver.driverId === championID
      );

      return {
        driver: championshipsWon[0]?.driverStanding?.Driver,
        championshipsWon: championshipsWon,
      };
    })
    // Descending order (of number of championships won)
    .sort((a, b) => {
      return b.championshipsWon.length - a.championshipsWon.length;
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
}
