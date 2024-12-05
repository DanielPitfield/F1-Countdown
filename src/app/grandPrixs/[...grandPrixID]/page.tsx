import styles from "../../styles/GrandPrixProfile.module.scss";

import CircuitLink from "../../../components/Links/CircuitLink";
import Podium from "../../../components/Podium";
import DriverStandings from "../../../components/DriverStandings";
import TeamStandings from "../../../components/TeamStandings";
import QualifyingResults from "../../../components/QualifyingResults";
import RaceResults from "../../../components/RaceResults";
import SeasonLink from "../../../components/Links/SeasonLink";
import { getGrandPrixSchedule } from "../../../utils/serverActions/grandPrix/getGrandPrixSchedule";
import { getGrandPrixQualifying } from "../../../utils/serverActions/grandPrix/getGrandPrixQualifying";
import { getGrandPrixRace } from "../../../utils/serverActions/grandPrix/getGrandPrixRace";
import { getDriverStandingsAfter } from "../../../utils/serverActions/grandPrix/getDriverStandingsAfter";
import { getTeamStandingsAfter } from "../../../utils/serverActions/grandPrix/getTeamStandingsAfter";

interface PageProps {
  params: {
    // The dynamic parameter of the route (catch all route so this will always be an array)
    grandPrix: string[];
  };
}

export default async function Page(props: PageProps) {
  const [seasonParam, roundNumberParam] = props.params.grandPrix;

  const config = {
    season: seasonParam ?? "",
    roundNumber: roundNumberParam ?? "",
  };

  const [schedule, qualifying, race, driverStandings, teamStandings] = await Promise.all([
    getGrandPrixSchedule(config),
    getGrandPrixQualifying(config),
    getGrandPrixRace(config),
    getDriverStandingsAfter(config),
    getTeamStandingsAfter(config),
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <h1 className={styles.title}>
          <SeasonLink season={schedule?.season} />
          {` ${schedule?.raceName}`}
        </h1>

        <h3 className={styles.subtitle}>
          <CircuitLink circuit={schedule?.Circuit} />
        </h3>
      </div>

      <div>{`Round ${schedule?.round}`}</div>
      <div>{`(${schedule?.date})`}</div>

      <Podium race={race} showTeams={true} showTimes={true} />

      <QualifyingResults qualifying={qualifying} showTeams={false} showTimes={true} />
      <RaceResults race={race} showPositions={true} showTeams={false} showTimes={true} />

      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </div>
  );
}
