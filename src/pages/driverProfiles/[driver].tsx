import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import superjson from "superjson";
import { prisma } from "../../server/db/client";

import DriverProfileHeader from "../../components/Profiles/Driver/DriverProfileHeader";
import DriverProfileFacts from "../../components/Profiles/Driver/DriverProfileFacts";

import styles from "../../styles/DriverProfile.module.scss";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ driver: string }>
) {
  // Helper function
  const ssg = createProxySSGHelpers({
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
  await ssg.driver.getRaces.prefetch({ driverID: driver });
  await ssg.driver.getPolePositions.prefetch({ driverID: driver });
  await ssg.driver.getNumFastestLaps.prefetch({ driverID: driver });
  await ssg.driver.getChampionshipResults.prefetch({ driverID: driver });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      driver,
    },
  };
}

const DriverProfile = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data: championshipResults } =
    trpc.driver.getChampionshipResults.useQuery({
      driverID: props.driver,
    });

  return (
    <div className={styles.wrapper}>
      <DriverProfileHeader
        driverID={props.driver}
      />

      <div className={styles.innerWrapper}>
        <Image
          src={`/Images/drivers/${props.driver}.jpg`}
          alt={props.driver}
          height={640}
          width={640}
        />
        <DriverProfileFacts
          driverID={props.driver}
          championshipResults={championshipResults}
        />
      </div>
    </div>
  );
};

export default DriverProfile;
