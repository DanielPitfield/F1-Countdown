import { trpc } from "../../utils/trpc";
import CircuitLink from "../../components/Links/CircuitLink";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Podium from "../../components/Podium";
import DriverStandings from "../../components/DriverStandings";
import TeamStandings from "../../components/TeamStandings";
import QualifyingResults from "../../components/QualifyingResults";
import RaceResults from "../../components/RaceResults";
import SeasonLink from "../../components/Links/SeasonLink";

import styles from "../../styles/GrandPrixProfile.module.scss";

export async function getServerSideProps(context: GetServerSidePropsContext<{ grandPrix: string[] }>) {
  // The dynamic parameter of the route (catch all route so this will always be an array)
  const grandPrix = context.params?.grandPrix as string[];
  // Destructure the season and roundNumber segments of the route
  const [seasonParam, roundNumberParam] = grandPrix;

  const season = seasonParam ?? "";
  const roundNumber = roundNumberParam ?? "";

  return {
    props: {
      season: season,
      roundNumber: roundNumber,
    },
  };
}

const GrandPrixProfile = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: schedule } = trpc.grandPrix.getSchedule.useQuery({
    season: props.season,
    roundNumber: props.roundNumber,
  });

  const { data: qualifying } = trpc.grandPrix.getQualifying.useQuery({
    season: props.season,
    roundNumber: props.roundNumber,
  });

  const { data: race } = trpc.grandPrix.getRace.useQuery({
    season: props.season,
    roundNumber: props.roundNumber,
  });

  const { data: driverStandings } = trpc.grandPrix.getDriverStandingsAfter.useQuery({
    season: props.season,
    roundNumber: props.roundNumber,
  });

  const { data: teamStandings } = trpc.grandPrix.getTeamStandingsAfter.useQuery({
    season: props.season,
    roundNumber: props.roundNumber,
  });

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
};

export default GrandPrixProfile;
