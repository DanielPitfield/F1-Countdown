import { trpc } from "../utils/trpc";

// TODO: Forward the data as a prop to BarChart component
const Statistics = () => {
  const { data: champions } = trpc.statistics.getWorldChampions.useQuery();

  return (
    <div className="wrapper">
      {champions?.map((driver) => {
        // First name and surname
        const fullName = `${driver.givenName} ${driver.familyName}`;
        // Get the seasons (championships they won)
        const { data: winningYears } =
          trpc.statistics.getDriverWinningYears.useQuery({
            driverName: driver.familyName,
          });

        return (
          <div key={fullName} className="driver-wrapper">
            <div className="driver-title">{fullName}</div>
            {winningYears?.map((year) => {
              return (
                <div key={year.season} className="driver-winning-year">
                  {year.season}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Statistics;
