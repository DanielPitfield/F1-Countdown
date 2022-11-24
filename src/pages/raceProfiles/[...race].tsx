import { trpc } from "../../utils/trpc";
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

import styles from "../../styles/Profile.module.scss";
import Link from "next/link";

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
  await ssg.race.getInfo.prefetch({
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

  const { data: raceInfo } = trpc.race.getInfo.useQuery({
    season: season,
    roundNumber: roundNumber,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{`${raceInfo?.season} - Round ${raceInfo?.round}`}</span>
        <span>{`${raceInfo?.raceName} (${raceInfo?.date})`}</span>
        <Link href={`/circuitProfiles/${raceInfo?.Circuit.circuitID}`}>
          {raceInfo?.Circuit.circuitName}
        </Link>
      </div>

      {raceInfo && <Podium race={raceInfo} showTeams={true} showTimes={true} />}
    </div>
  );
};

export default RaceProfile;
