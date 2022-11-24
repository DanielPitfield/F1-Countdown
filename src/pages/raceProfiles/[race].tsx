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

import styles from "../../styles/Profile.module.scss";
import { Podium } from "../../components/Podium";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO: Build time SSG
    paths: [{ params: { race: "2022/3" } }, { params: { race: "2022/4" } }],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ race: string }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route
  const race = context.params?.race as string;

  // Pre-fetching data (so that it is immediately available)
  await ssg.race.getInfo.prefetch({ raceID: race });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      race: race,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const RaceProfile = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { race } = props;

  const { data: raceInfo } = trpc.race.getInfo.useQuery({
    raceID: race,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{`${raceInfo?.season} - Round ${raceInfo?.round}`}</span>
        <span>{`${raceInfo?.raceName} - ${raceInfo?.date}`}</span>
      </div>

      {raceInfo && <Podium race={raceInfo} showTeams={true} showTimes={true} />}
    </div>
  );
};

export default RaceProfile;
