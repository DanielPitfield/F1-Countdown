import intervalToDuration from "date-fns/intervalToDuration";
import { trpc } from "../../utils/trpc";
import styles from "../../styles/driverProfile.module.scss";
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
    paths: [
      { params: { driver: "max_verstappen" } },
      { params: { driver: "hamilton" } },
    ],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ driver: string }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route
  const driver = context.params?.driver as string;

  // Pre-fetching data (so that it is immediately available)
  const driverInfo = await ssg.driver.getInfo.fetch({ driverID: driver });
  await ssg.driver.getTeamsDrivenFor.prefetch({ driverID: driver });
  await ssg.driver.getPolePositions.prefetch({
    driverID: driver,
    isReturnOnlyTotalNum: true,
  });
  await ssg.driver.getRaceWins.prefetch({
    driverID: driver,
    isReturnOnlyTotalNum: true,
  });
  await ssg.driver.getFastestLaps.prefetch({
    driverID: driver,
    isReturnOnlyTotalNum: true,
  });
  await ssg.driver.getWorldChampionshipWinningYears.prefetch({
    driverID: driver,
  });

  // TODO: Is age statically generated?
  const age =
    intervalToDuration({
      start: driverInfo?.dateOfBirth
        ? new Date(driverInfo?.dateOfBirth)
        : new Date(),
      end: new Date(),
    }).years ?? 0;

  return {
    props: {
      trpcState: ssg.dehydrate(),
      driver,
      age,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const DriverProfile = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { driver } = props;

  const { data: generalInformation } = trpc.driver.getInfo.useQuery({
    driverID: driver,
  });

  const { data: teamsDrivenFor } = trpc.driver.getTeamsDrivenFor.useQuery({
    driverID: driver,
  });

  const { data: polePositions } = trpc.driver.getPolePositions.useQuery({
    driverID: driver,
    isReturnOnlyTotalNum: true,
  });

  const { data: raceWins } = trpc.driver.getRaceWins.useQuery({
    driverID: driver,
    isReturnOnlyTotalNum: true,
  });

  const { data: fastestLaps } = trpc.driver.getFastestLaps.useQuery({
    driverID: driver,
    isReturnOnlyTotalNum: true,
  });

  const { data: worldChampionships } =
    trpc.driver.getWorldChampionshipWinningYears.useQuery({
      driverID: driver,
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{`${generalInformation?.givenName} ${generalInformation?.familyName}`}</span>
        <span>{generalInformation?.dateOfBirth}</span>
        <span>{props.age}</span>
        <span>{generalInformation?.nationality}</span>
      </div>

      <span className={styles.teamsDrivenFor}>
        {teamsDrivenFor?.map((team) => team.name).join(", ")}
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

export default DriverProfile;
