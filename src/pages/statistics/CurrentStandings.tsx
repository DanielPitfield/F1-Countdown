import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";

const CurrentStandings: NextPage = () => {
  const { data: driverStandings } =
    trpc.statistics.getCurrentDriverStandings.useQuery();

    console.log(driverStandings);

  const { data: teamStandings } =
    trpc.statistics.getCurrentTeamStandings.useQuery();

  return (
    <>
      <div>
        {driverStandings?.map((standing) => {
          const driver = standing.Driver;
          const fullName = `${driver?.givenName} ${driver?.familyName}`;

          return (
            <div key={fullName}>
              <div>{`${standing.position} ${fullName}`}</div>
              <div>{standing.Constructors[0]?.name}</div>
              <div>{standing.points}</div>
              <div>{standing.wins}</div>
            </div>
          );
        })}
      </div>

      <div>
        {teamStandings?.map((standing) => {
          return (
            <div key={standing.Constructor.name}>
              <div>{`${standing.position} ${standing.Constructor.name}`}</div>
              <div>{standing.points}</div>
              <div>{`Wins: ${standing.wins}`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CurrentStandings;
