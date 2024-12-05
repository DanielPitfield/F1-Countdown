import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import SeasonLink from "../../../components/Links/SeasonLink";
import DriverStandings from "../../../components/DriverStandings";
import TeamStandings from "../../../components/TeamStandings";
import { getCurrentYear } from "../../../utils/getCurrentYear";

const CurrentStandings: NextPage = () => {
  const { data: driverStandings } = trpc.season.getDriverStandings.useQuery({
    seasonID: "current",
  });

  const { data: teamStandings } = trpc.season.getTeamStandings.useQuery({
    seasonID: "current",
  });

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
