import { trpc } from "../../utils/trpc";
import styles from "../../styles/teamProfile.module.scss";
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO: Build time SSG

    /*
    If the dynamic parameter can be provided below in paths[],
    getStaticProps() will only need to be called at build time (the page will load very fast!),
    Otherwise, it will be called before initial render (due to using fallback: blocking),
    Therefore, try and save team names in database using Prisma,
    and add them to the paths[] array using findMany() method of Prisma context

    NOTE:
    In development (next dev), getStaticPaths() and getStaticProps() will be called on every request
    */

    paths: [{ params: { team: "ferrari" } }, { params: { team: "red_bull" } }],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ team: string }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route
  const team = context.params?.team as string;

  // Pre-fetching data (so that it is immediately available)
  await ssg.team.getInfo.prefetch({ teamID: team });
  await ssg.team.getDrivers.prefetch({
    teamID: team,
    isReturnOnlyCurrentDrivers: true,
  });
  await ssg.team.getPolePositions.prefetch({
    teamID: team,
    isReturnOnlyTotalNum: true,
  });
  await ssg.team.getRaceWins.prefetch({
    teamID: team,
    isReturnOnlyTotalNum: true,
  });
  await ssg.team.getFastestLaps.prefetch({
    teamID: team,
    isReturnOnlyTotalNum: true,
  });
  await ssg.team.getWorldChampionshipWinningYears.prefetch({
    teamID: team,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      team,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const TeamProfile = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { team } = props;

  const { data: generalInformation } = trpc.team.getInfo.useQuery({
    teamID: team,
  });

  const { data: currentDrivers } = trpc.team.getDrivers.useQuery({
    teamID: team,
    isReturnOnlyCurrentDrivers: true,
  });

  const { data: polePositions } = trpc.team.getPolePositions.useQuery({
    teamID: team,
    isReturnOnlyTotalNum: true,
  });

  const { data: raceWins } = trpc.team.getRaceWins.useQuery({
    teamID: team,
    isReturnOnlyTotalNum: true,
  });

  const { data: fastestLaps } = trpc.team.getFastestLaps.useQuery({
    teamID: team,
    isReturnOnlyTotalNum: true,
  });

  const { data: worldChampionships } =
    trpc.team.getWorldChampionshipWinningYears.useQuery({
      teamID: team,
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{generalInformation?.name}</span>
        <span>{generalInformation?.nationality}</span>
      </div>

      <span className={styles.currentDrivers}>
        {currentDrivers
          ?.map((driver) => `${driver.givenName} ${driver.familyName}`)
          .join(", ")}
      </span>

      <div className={styles.resultsInformation}>
        <span>{`Pole positions: ${polePositions}`}</span>
        <span>{`Race wins: ${raceWins}`}</span>
        <span>{`Fastest Laps: ${fastestLaps}`}</span>
        <span>{`World championships: ${worldChampionships?.length}`}</span>
        {Boolean(worldChampionships && worldChampionships.length > 0) &&
          worldChampionships
            ?.map((championship) => championship.season)
            .join(", ")}
      </div>
    </div>
  );
};

export default TeamProfile;
