import { trpc } from "../utils/trpc";

const Statistics = () => {
  const { data } = trpc.statistics.getWorldChampions.useQuery();

  return data?.map((driver) => {
    const driverName = `${driver.givenName} ${driver.familyName}`;
    return <div key={driverName}>{driverName}</div>;
  });
};

export default Statistics;
