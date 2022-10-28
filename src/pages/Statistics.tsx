import { trpc } from "../utils/trpc";

// TODO: Forward the data as a prop to BarChart component
const Statistics = () => {
  const { data: worldChampions } = trpc.statistics.getWorldChampions.useQuery();

  worldChampions?.sort(
    (a, b) =>
      b.winningYears.length -
      a.winningYears.length
  );

  return (
    <div className="wrapper">
      {worldChampions?.map((worldChampion) => {
        return (
          <div key={worldChampion.name} className="driver-wrapper">
            <div className="driver-title">{worldChampion.name}</div>
            <div className="driver-winning-years">
              {worldChampion.winningYears.join(", ")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Statistics;
