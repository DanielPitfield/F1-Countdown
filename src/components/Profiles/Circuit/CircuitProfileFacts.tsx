import { Race } from "../../../server/trpc/router/grandPrix";
import { Fact } from "../../Fact";
import GrandPrixLink from "../../Links/GrandPrixLink";

import styles from "../../../styles/CircuitProfile.module.scss";

interface CircuitProfileFactsProps {
  circuitID: string;
  pastWinners: {
    results: Race[];
    firstYear: Race;
    totalNum: number;
  } | undefined;
}

const CircuitProfileFacts = (props: CircuitProfileFactsProps) => {
  return (
    <div>
      <div className={styles.facts}>
        <Fact label="First Grand Prix">
          <GrandPrixLink
            grandPrix={props.pastWinners?.firstYear}
            showRaceName={false}
          />
        </Fact>

        <Fact label="Number of Grand Prix">
          {props.pastWinners?.totalNum ?? "0"}
        </Fact>
      </div>
    </div>
  );
};

export default CircuitProfileFacts;
