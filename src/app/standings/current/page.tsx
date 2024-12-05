import SeasonLink from "../../../components/Links/SeasonLink";
import DriverStandings from "../../../components/DriverStandings";
import TeamStandings from "../../../components/TeamStandings";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import { getSeasonDriverStandings } from "../../../utils/serverActions/season/getSeasonDriverStandings";
import { getSeasonTeamStandings } from "../../../utils/serverActions/season/getSeasonTeamStandings";

export default async function Page() {
  const [driverStandings, teamStandings] = await Promise.all([
    getSeasonDriverStandings({ seasonID: "current" }),
    getSeasonTeamStandings({ seasonID: "current" }),
  ]);

  return (
    <>
      <h1>
        <SeasonLink season={getCurrentYear().toString()} /> Standings
      </h1>
      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </>
  );
}
