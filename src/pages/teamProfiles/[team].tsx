import { trpc } from "../../utils/trpc";
import DriverLink from "../../components/Links/DriverLink";
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
  await ssg.team.getDrivers.prefetch({ teamID: team });
  await ssg.team.getPolePositions.prefetch({ teamID: team });
  await ssg.team.getRaceWins.prefetch({ teamID: team });
  await ssg.team.getFastestLaps.prefetch({ teamID: team });
  await ssg.team.getChampionshipResults.prefetch({ teamID: team });

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

  const { data: drivers } = trpc.team.getDrivers.useQuery({
    teamID: team,
  });

  const { data: polePositions } = trpc.team.getPolePositions.useQuery({
    teamID: team,
  });

  const { data: raceWins } = trpc.team.getRaceWins.useQuery({ teamID: team });

  const { data: fastestLaps } = trpc.team.getFastestLaps.useQuery({
    teamID: team,
  });

  const { data: championshipResults } =
    trpc.team.getChampionshipResults.useQuery({
      teamID: team,
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{generalInformation?.name}</span>
        <span>{generalInformation?.nationality}</span>
      </div>

      <div className={styles.currentDrivers}>
        <strong>Current Drivers</strong>
        {drivers?.current?.map((driver) => {
          return (
            <div key={driver.driverId}>
              <DriverLink driver={driver} />
            </div>
          );
        })}
      </div>

      <div className={styles.resultsInformation}>
        <span>{`Pole positions: ${polePositions?.totalNum ?? "0"}`}</span>
        <span>{`Race wins: ${raceWins?.totalNum ?? "0"}`}</span>
        <span>{`Fastest Laps: ${fastestLaps?.totalNum ?? "0"}`}</span>
        <span>{`World championships: ${
          championshipResults?.numChampionshipsWon ?? "0"
        }`}</span>

        {championshipResults &&
          championshipResults.numChampionshipsWon > 0 &&
          championshipResults.winningYears
            ?.map((championship) => championship.season)
            .join(", ")}
      </div>
    </div>
  );
};

export default TeamProfile;
