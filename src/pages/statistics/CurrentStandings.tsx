import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import SeasonLink from "../../components/Links/SeasonLink";
import DriverStandings from "../../components/Statistics/DriverStandings";
import TeamStandings from "../../components/Statistics/TeamStandings";
import { getCurrentYear } from "../../utils/getCurrentYear";

const CurrentStandings: NextPage = () => {
  const { data: driverStandings } =
    trpc.statistics.getCurrentDriverStandings.useQuery();

  const { data: teamStandings } =
    trpc.statistics.getCurrentTeamStandings.useQuery();

  return (
    <>
      <h1>
        <SeasonLink season={getCurrentYear().toString()} /> Standings
      </h1>
      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </>
  );
};

export default CurrentStandings;
