import { trpc } from "../../utils/trpc";
import Image from "next/image";
import TeamLink from "../../components/Links/TeamLink";
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

import DriverProfileHeader from "../../components/Profiles/Driver/DriverProfileHeader";
import DriverProfileFacts from "../../components/Profiles/Driver/DriverProfileFacts";

import styles from "../../styles/DriverProfile.module.scss";

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
  await ssg.driver.getDescription.fetch({
    driverID: driver,
  });
  await ssg.driver.isActive.prefetch({ driverID: driver });
  await ssg.driver.getTeamsDrivenFor.prefetch({ driverID: driver });
  await ssg.driver.getRacesEntered.prefetch({ driverID: driver });
  await ssg.driver.getPolePositions.prefetch({ driverID: driver });
  await ssg.driver.getRaceWins.prefetch({ driverID: driver });
  await ssg.driver.getNumFastestLaps.prefetch({ driverID: driver });
  await ssg.driver.getChampionshipResults.prefetch({ driverID: driver });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      driver,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const DriverProfile = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { data: teamsDrivenFor } = trpc.driver.getTeamsDrivenFor.useQuery({
    driverID: props.driver,
  });

  return (
    <div className={styles.wrapper}>
      <DriverProfileHeader driverID={props.driver} />

      <div className={styles.innerWrapper}>
        <Image
          src={`/images/drivers/${props.driver}.jpg`}
          alt={props.driver}
          height={640}
          width={640}
        />
        <DriverProfileFacts driverID={props.driver} />
      </div>

      <div className={styles.teamsDrivenFor}>
        <strong>Teams Driven For</strong>
        {teamsDrivenFor?.map((team) => {
          return (
            <div key={team.constructorId}>
              <TeamLink team={team} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriverProfile;
