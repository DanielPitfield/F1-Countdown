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
import { getDriverName } from "../../utils/getDriverName";

import styles from "../../styles/Profile.module.scss";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO: Build time SSG
    paths: [{ params: { circuit: "monza" } }, { params: { circuit: "spa" } }],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ circuit: string }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route
  const circuit = context.params?.circuit as string;

  // Pre-fetching data (so that it is immediately available)
  await ssg.circuit.getInfo.prefetch({ circuitID: circuit });
  await ssg.circuit.getWinners.prefetch({ circuitID: circuit });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      circuit,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const CircuitProfile = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { circuit } = props;

  const { data: generalInformation } = trpc.circuit.getInfo.useQuery({
    circuitID: circuit,
  });

  const { data: previousWinners } = trpc.circuit.getWinners.useQuery({
    circuitID: circuit,
  });

  // For how many previous years should the results of races at this circuit be shown?
  const NUM_PREVIOUS_YEARS = 5;

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{generalInformation?.circuitName}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${generalInformation?.Location.lat},${generalInformation?.Location.long}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${generalInformation?.Location.locality}, ${generalInformation?.Location.country}`}
        </a>
      </div>

      <div className={styles.generalInformation}>
        {/* TODO: Link to the raceProfile for this firstYear race */}
        <span>{`First Grand Prix: ${previousWinners?.firstYear ?? "-"}`}</span>
        <span>{`Number of Grand Prix: ${
          previousWinners?.totalNum ?? "-"
        }`}</span>
      </div>

      <div className={styles.generalInformation}>
        <span>Previous Winners</span>
        {previousWinners?.results.slice(-NUM_PREVIOUS_YEARS).map((race) => {
          return (
            <Link
              key={race.Results[0]?.Driver.driverId}
              href={`/driverProfiles/${race.Results[0]?.Driver.driverId}`}
            >
              {`${race.season} ${getDriverName(race.Results[0]?.Driver)} (${
                race.Results[0]?.Time.time
              })`}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CircuitProfile;
