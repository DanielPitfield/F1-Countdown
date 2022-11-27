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
import DriverStandings from "../../components/Statistics/DriverStandings";
import TeamStandings from "../../components/Statistics/TeamStandings";
import { Race } from "../../server/trpc/router/grandPrix";

import styles from "../../styles/Profile.module.scss";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO: Build time SSG
    paths: [{ params: { season: "2021" } }, { params: { season: "2022" } }],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ season: string }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route
  const season = context.params?.season as string;

  // Pre-fetching data (so that it is immediately available)
  await ssg.season.getSchedule.prefetch({ seasonID: season });
  await ssg.season.getDriverStandings.prefetch({ seasonID: season });
  await ssg.season.getTeamStandings.prefetch({ seasonID: season });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      season,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const SeasonProfile = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { season } = props;

  const { data: schedule } = trpc.season.getSchedule.useQuery({
    seasonID: season,
  });

  const { data: driverStandings } = trpc.season.getDriverStandings.useQuery({
    seasonID: season,
  });

  const { data: teamStandings } = trpc.season.getTeamStandings.useQuery({
    seasonID: season,
  });

  // TODO: Schedule component?
  // TODO: race.raceName property (use elsewhere?)

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        {schedule?.map((race: Race) => {
          return (
            <div key={race.round}>
              <span>{race.raceName}</span>
              <span>{race.date}</span>
            </div>
          );
        })}
      </div>

      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </div>
  );
};

export default SeasonProfile;
