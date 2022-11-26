import { trpc } from "../../utils/trpc";
import GrandPrixLink from "../../components/Links/GrandPrixLink";
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

// For how many previous years should the results of races at this circuit be shown?
const NUM_PAST_WINNERS = 5;

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
  await ssg.circuit.getPastWinners.prefetch({
    circuitID: circuit,
    numPastWinners: NUM_PAST_WINNERS,
  });

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

  const { data: pastWinners } = trpc.circuit.getPastWinners.useQuery({
    circuitID: circuit,
    numPastWinners: NUM_PAST_WINNERS,
  });

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
        {/* TODO: Link to the grandPrixProfile for this firstYear race */}
        <span>{`First Grand Prix: ${pastWinners?.firstYear ?? "-"}`}</span>
        <span>{`Number of Grand Prix: ${pastWinners?.totalNum ?? "-"}`}</span>
      </div>

      <div className={styles.generalInformation}>
        <strong>Previous Winners</strong>
        {pastWinners?.results.map((race) => {
          const driver = race.Results[0]?.Driver;

          return (
            <div key={driver?.driverId}>
              <GrandPrixLink grandPrix={race} />
              <DriverLink driver={driver} />
              {`(${race.Results[0]?.Time?.time})`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircuitProfile;
