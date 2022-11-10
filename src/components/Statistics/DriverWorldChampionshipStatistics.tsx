import { DriverSeasonHistory } from "../../server/trpc/router/driver";
import WorldChampionshipStatistic from "./WorldChampionStatistic";
import { trpc } from "../../utils/trpc";

import styles from "../../styles/statistics/driverWorldChampionships.module.scss";

const DriverWorldChampionshipStatistics = () => {
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
      history.filter((season) => season.DriverStandings[0]?.Driver.driverId === a)
        .length
    );
  });

  return (
    <div className={styles.wrapper}>
      {uniqueWorldChampions.map((championID) => {
        const championshipsWon: DriverSeasonHistory[] = history.filter(
          (season) => season.DriverStandings[0]?.Driver.driverId === championID
        );

        return (
          <WorldChampionshipStatistic
            key={championID}
            championshipsWon={championshipsWon}
          />
        );
      })}
    </div>
  );
};

export default DriverWorldChampionshipStatistics;
