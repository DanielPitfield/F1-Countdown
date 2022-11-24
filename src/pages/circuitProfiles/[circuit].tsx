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
        <span>{`First Grand Prix: ${previousWinners?.firstYear ?? "-"}`}</span>
        <span>{`Number of Grand Prix: ${
          previousWinners?.totalNum ?? "-"
        }`}</span>
      </div>

      <div className={styles.generalInformation}>
        <span>Previous Winners</span>
        {previousWinners?.results
          // TODO: How many previous winners?
          .slice(-5)
          .map((race) => {
            return (
              <span key={race.date}>{`${race.season} ${getDriverName(
                race.Results[0]?.Driver
              )} (${race.Results[0]?.Time.time})`}</span>
            );
          })}
      </div>
    </div>
  );
};

export default CircuitProfile;
