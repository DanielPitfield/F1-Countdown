import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import DriverStandings from "../../components/DriverStandings";

const CurrentStandings: NextPage = () => {
  const { data: driverStandings } = trpc.season.getDriverStandings.useQuery({
    seasonID: "current",
  });

  return (
    <>
      <h1>Driver Standings</h1>
      <DriverStandings standings={driverStandings} />
    </>
  );
};

export default CurrentStandings;
