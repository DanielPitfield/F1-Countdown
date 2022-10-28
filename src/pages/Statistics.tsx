import { trpc } from "../utils/trpc";

// TODO: Forward the data as a prop to BarChart component
const Statistics = () => {
  const { data: champions } = trpc.statistics.getWorldChampions.useQuery();

  champions?.sort(
    (a, b) =>
      b.winningYears.length -
      a.winningYears.length
  );

  return (
    <div className="wrapper">
      {champions?.map((champion) => {
        return (
          <div key={champion.name} className="driver-wrapper">
            <div className="driver-title">{champion.name}</div>
            <div className="driver-winning-years">
              {champion.winningYears.join(", ")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Statistics;
