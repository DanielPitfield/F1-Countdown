import styles from "../../styles/CircuitProfile.module.scss";

import CircuitProfileHeader from "../../../components/Profiles/Circuit/CircuitProfileHeader";
import CircuitProfileFacts from "../../../components/Profiles/Circuit/CircuitProfileFacts";
import PreviousWinners from "../../../components/PreviousWinners";
import { getCircuitPastWinners } from "../../../utils/serverActions/circuit/getCircuitPastWinners";

// For how many previous years should the results of races at this circuit be shown?
const NUM_PAST_WINNERS = 5;

interface PageProps {
  params: {
    circuitID: string;
  };
}

export default async function Page(props: PageProps) {
  const circuitID = props.params.circuitID;

  const pastWinners = await getCircuitPastWinners({
    circuitID,
    numPastWinners: NUM_PAST_WINNERS,
  });

  return (
    <div className={styles.wrapper}>
      <CircuitProfileHeader circuitID={circuitID} />
      <CircuitProfileFacts circuitID={circuitID} pastWinners={pastWinners} />
      <PreviousWinners previousRaces={pastWinners?.results} />
    </div>
  );
}
