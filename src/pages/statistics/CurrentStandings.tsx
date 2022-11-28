import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import SeasonLink from "../../components/Links/SeasonLink";
import DriverStandings from "../../components/Statistics/DriverStandings";
import TeamStandings from "../../components/Statistics/TeamStandings";
import { getYear } from "date-fns";

const CurrentStandings: NextPage = () => {
  const { data: driverStandings } =
    trpc.statistics.getCurrentDriverStandings.useQuery();

  const { data: teamStandings } =
    trpc.statistics.getCurrentTeamStandings.useQuery();

  const currentYear: string = getYear(new Date()).toString();

  return (
    <>
      <h1>
        <SeasonLink season={currentYear} /> Standings
      </h1>
      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </>
  );
};

export default CurrentStandings;
