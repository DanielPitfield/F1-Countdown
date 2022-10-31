import { trpc } from "../utils/trpc";
import styles from "../styles/statistics/driverWorldChampionship.module.scss";

const DriverWorldChampionshipStatistics = () => {
  const { data: driverWorldChampionshipHistory } =
    trpc.statistics.getDriverWorldChampionshipHistory.useQuery();

  // TODO: Refactor so the procedure returns an object which can be easily displayed (instead of manipulating the data fetch client-side)

  const uniqueWorldChampions = Array.from(
    new Set(
      driverWorldChampionshipHistory?.map((season) => season.winningDriverID)
    )
  );

  return (
    <div className={styles.wrapper}>
      {uniqueWorldChampions.map((championID) => {
        const worldChampionName = driverWorldChampionshipHistory?.find(
          (season) => season.winningDriverID === championID
        )?.winningDriverFullName;

        const championshipsWon = driverWorldChampionshipHistory?.filter(
          (season) => season.winningDriverID === championID
        );

        return (
          <div key={worldChampionName} className={styles.driverWrapper}>
            <div className={styles.driverName}>{worldChampionName}</div>
            <div className={styles.numChampionships}>
              {championshipsWon?.length}
            </div>
            <div className={styles.winningYears}>
              {championshipsWon?.map((season) => season.year).join(" , ")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverWorldChampionshipStatistics;
