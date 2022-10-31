import { trpc } from "../utils/trpc";
import styles from "../styles/statistics/driverWorldChampionships.module.scss";
import { SeasonHistory } from "../server/trpc/router/statistics";
import WorldChampionshipStatistic from "./WorldChampionStatistic";

export type SeasonResult = {
  year: string;
  winningDriverID: string;
  winningDriverFullName: string;
  // The team of the driver's champion (not always the constructor's champion)
  winningDriverTeam: string;
};

const DriverWorldChampionshipStatistics = () => {
  const { data: driverWorldChampionshipHistory } =
    trpc.statistics.getDriverWorldChampionshipHistory.useQuery();

  if (!driverWorldChampionshipHistory) {
    return null;
  }

  const seasonResults: SeasonResult[] = driverWorldChampionshipHistory.map(
    (seasonHistory: SeasonHistory) =>
      ({
        year: seasonHistory.season,
        winningDriverID: seasonHistory.DriverStandings[0]?.Driver.driverId,
        // The name is already within the data fetched (this saves an API call of the procedure driver.getInfo)
        winningDriverFullName: `${seasonHistory.DriverStandings[0]?.Driver.givenName} ${seasonHistory.DriverStandings[0]?.Driver.familyName}`,
        // The team of the driver's champion (not always the constructor's champion)
        winningDriverTeam:
          seasonHistory.DriverStandings[0]?.Constructors[0]?.constructorId,
      } as SeasonResult)
  );

  const uniqueWorldChampions = Array.from(
    new Set(seasonResults?.map((season) => season.winningDriverID))
  );

  return (
    <div className={styles.wrapper}>
      {uniqueWorldChampions.map((championID) => {
        const championshipsWon = seasonResults.filter(
          (season) => season.winningDriverID === championID
        );

        const fullName =
          seasonResults.find((season) => season.winningDriverID === championID)
            ?.winningDriverFullName ?? "";

        return (
          <WorldChampionshipStatistic
            key={championID}
            fullName={fullName}
            championshipsWon={championshipsWon}
          />
        );
      })}
    </div>
  );
};

export default DriverWorldChampionshipStatistics;
