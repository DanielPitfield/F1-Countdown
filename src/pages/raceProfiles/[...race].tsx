import { trpc } from "../../utils/trpc";
import Link from "next/link";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import superjson from "superjson";
import { prisma } from "../../server/db/client";
import { REVALDATION_PERIOD } from "../../utils/limits";
import { Podium } from "../../components/Podium";
import DriverStandings from "../../components/Statistics/DriverStandings";
import TeamStandings from "../../components/Statistics/TeamStandings";

import styles from "../../styles/Profile.module.scss";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO: Build time SSG
    paths: [
      { params: { race: ["2022", "3"] } },
      { params: { race: ["2022", "4"] } },
    ],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ race: string[] }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route (catch all route so this will always be an array)
  const race = context.params?.race as string[];
  // Destructure the season and roundNumber segments of the route
  const [season, roundNumber] = race;

  // Pre-fetching data (so that it is immediately available)
  await ssg.race.getSchedule.prefetch({
    season: season ?? "",
    roundNumber: roundNumber ?? "",
  });
  await ssg.race.getQualifying.prefetch({
    season: season ?? "",
    roundNumber: roundNumber ?? "",
  });
  await ssg.race.getRace.prefetch({
    season: season ?? "",
    roundNumber: roundNumber ?? "",
  });
  await ssg.race.getDriverStandingsAfter.prefetch({
    season: season ?? "",
    roundNumber: roundNumber ?? "",
  });
  await ssg.race.getTeamStandingsAfter.prefetch({
    season: season ?? "",
    roundNumber: roundNumber ?? "",
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      season: season ?? "",
      roundNumber: roundNumber ?? "",
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const RaceProfile = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { season, roundNumber } = props;

  const { data: schedule } = trpc.race.getSchedule.useQuery({
    season: season,
    roundNumber: roundNumber,
  });

  const { data: qualifying } = trpc.race.getQualifying.useQuery({
    season: season,
    roundNumber: roundNumber,
  });

  const { data: race } = trpc.race.getRace.useQuery({
    season: season,
    roundNumber: roundNumber,
  });

  const { data: driverStandings } = trpc.race.getDriverStandingsAfter.useQuery({
    season: season,
    roundNumber: roundNumber,
  });

  const { data: teamStandings } = trpc.race.getTeamStandingsAfter.useQuery({
    season: season,
    roundNumber: roundNumber,
  });

  // TODO: Components to display qualifying and race results

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{`${schedule?.season} - Round ${schedule?.round}`}</span>
        <span>{`${schedule?.raceName} (${schedule?.date})`}</span>
        <Link href={`/circuitProfiles/${schedule?.Circuit.circuitId}`}>
          {schedule?.Circuit.circuitName}
        </Link>
      </div>

      <div className={styles.generalInformation}>
        <span>
          {JSON.stringify(qualifying?.QualifyingResults, undefined, 4)}
        </span>
      </div>

      <div className={styles.generalInformation}>
        <span>{JSON.stringify(race?.Results, undefined, 4)}</span>
      </div>

      {race && <Podium race={race} showTeams={true} showTimes={true} />}

      <DriverStandings standings={driverStandings ?? []} />

      <TeamStandings standings={teamStandings ?? []} />
    </div>
  );
};

export default RaceProfile;
