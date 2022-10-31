import { trpc } from "../utils/trpc";

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
    <div className="world-championship-statistics">
      {uniqueWorldChampions.map((championID) => {
        const worldChampionName = driverWorldChampionshipHistory?.find(
          (season) => season.winningDriverID === championID
        )?.winningDriverFullName;

        const championshipsWon = driverWorldChampionshipHistory?.filter(
          (season) => season.winningDriverID === championID
        );

        return (
          <div key={worldChampionName} className="world-champion-wrapper">
            <div className="world-champion-name">{worldChampionName}</div>
            <div className="world-champion-num-championships">
              {championshipsWon?.length}
            </div>
            <div className="world-champion-years-won">
              {championshipsWon?.map((season) => season.year).join(" , ")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverWorldChampionshipStatistics;
