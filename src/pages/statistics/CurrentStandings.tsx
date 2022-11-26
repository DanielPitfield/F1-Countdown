import type { NextPage } from "next";
import DriverStandings from "../../components/Statistics/DriverStandings";
import TeamStandings from "../../components/Statistics/TeamStandings";
import { trpc } from "../../utils/trpc";

const CurrentStandings: NextPage = () => {
  const { data: driverStandings } =
    trpc.statistics.getCurrentDriverStandings.useQuery();

  const { data: teamStandings } =
    trpc.statistics.getCurrentTeamStandings.useQuery();

  return (
    <>
      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </>
  );
};

export default CurrentStandings;
