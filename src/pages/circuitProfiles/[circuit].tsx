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

import CircuitProfileHeader from "../../components/Profiles/Circuit/CircuitProfileHeader";
import CircuitProfileFacts from "../../components/Profiles/Circuit/CircuitProfileFacts";
import PreviousWinners from "../../components/PreviousWinners";

import styles from "../../styles/CircuitProfile.module.scss";

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
  const { data: pastWinners } = trpc.circuit.getPastWinners.useQuery({
    circuitID: props.circuit,
    numPastWinners: NUM_PAST_WINNERS,
  });

  return (
    <div className={styles.wrapper}>
      <CircuitProfileHeader circuitID={props.circuit} />

      <CircuitProfileFacts
        circuitID={props.circuit}
        pastWinners={pastWinners}
      />

      <PreviousWinners previousRaces={pastWinners?.results} />
    </div>
  );
};

export default CircuitProfile;
