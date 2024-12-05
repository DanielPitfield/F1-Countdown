import { trpc } from "../../utils/trpc";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import CircuitProfileHeader from "../../../components/Profiles/Circuit/CircuitProfileHeader";
import CircuitProfileFacts from "../../../components/Profiles/Circuit/CircuitProfileFacts";
import PreviousWinners from "../../../components/PreviousWinners";

import styles from "../../styles/CircuitProfile.module.scss";

// For how many previous years should the results of races at this circuit be shown?
const NUM_PAST_WINNERS = 5;

export async function getServerSideProps(context: GetServerSidePropsContext<{ circuit: string }>) {
  // The dynamic parameter of the route
  const circuit = context.params?.circuit as string;

  return {
    props: {
      circuit,
    },
  };
}

const CircuitProfile = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: pastWinners } = trpc.circuit.getPastWinners.useQuery({
    circuitID: props.circuit,
    numPastWinners: NUM_PAST_WINNERS,
  });

  return (
    <div className={styles.wrapper}>
      <CircuitProfileHeader circuitID={props.circuit} />

      <CircuitProfileFacts circuitID={props.circuit} pastWinners={pastWinners} />

      <PreviousWinners previousRaces={pastWinners?.results} />
    </div>
  );
};

export default CircuitProfile;
