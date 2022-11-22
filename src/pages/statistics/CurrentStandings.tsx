import type { NextPage } from "next";
import DriverStanding from "../../components/Statistics/DriverStanding";
import TeamStanding from "../../components/Statistics/TeamStanding";
import { trpc } from "../../utils/trpc";

const CurrentStandings: NextPage = () => {
  const { data: driverStandings } =
    trpc.statistics.getCurrentDriverStandings.useQuery();

  const { data: teamStandings } =
    trpc.statistics.getCurrentTeamStandings.useQuery();

  const DriverStandings = () => {
    return (
      <div>
        {driverStandings?.map((standing) => {
          return (
            <DriverStanding
              key={standing.Driver.driverId}
              standing={standing}
            />
          );
        })}
      </div>
    );
  };

  const TeamStandings = () => {
    return (
      <div>
        {teamStandings?.map((standing) => {
          return (
            <TeamStanding key={standing.Constructor.name} standing={standing} />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <DriverStandings />
      <TeamStandings />
    </>
  );
};

export default CurrentStandings;
