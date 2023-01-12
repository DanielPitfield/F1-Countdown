import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import TeamStandings from "../../components/TeamStandings";

const CurrentStandings: NextPage = () => {
  const { data: teamStandings } = trpc.season.getTeamStandings.useQuery({
    seasonID: "current",
  });

  return (
    <>
      <h1>Constructor Standings</h1>
      <TeamStandings standings={teamStandings} />
    </>
  );
};

export default CurrentStandings;
