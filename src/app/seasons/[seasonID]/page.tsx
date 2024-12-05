import styles from "../../styles/Profile.module.scss";

import DriverStandings from "../../../components/DriverStandings";
import TeamStandings from "../../../components/TeamStandings";
import SeasonSchedule from "../../../components/SeasonSchedule";
import { getSeasonSchedule } from "../../../utils/serverActions/season/getSeasonSchedule";
import { getSeasonDriverStandings } from "../../../utils/serverActions/season/getSeasonDriverStandings";
import { getSeasonTeamStandings } from "../../../utils/serverActions/season/getSeasonTeamStandings";

interface PageProps {
  params: {
    seasonID: string;
  };
}

export default async function Page(props: PageProps) {
  const seasonID = props.params.seasonID;

  const [schedule, driverStandings, teamStandings] = await Promise.all([
    getSeasonSchedule({ seasonID }),
    getSeasonDriverStandings({ seasonID }),
    getSeasonTeamStandings({ seasonID }),
  ]);

  return (
    <div className={styles.wrapper}>
      <SeasonSchedule schedule={schedule} showDates={true} />
      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </div>
  );
}
