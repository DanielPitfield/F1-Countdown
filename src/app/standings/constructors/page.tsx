import TeamStandings from "../../../components/TeamStandings";
import { getSeasonTeamStandings } from "../../../utils/serverActions/season/getSeasonTeamStandings";

export default async function Page() {
  const teamStandings = await getSeasonTeamStandings({ seasonID: "current" });

  return (
    <>
      <h1>Constructor Standings</h1>
      <TeamStandings standings={teamStandings} />
    </>
  );
}
