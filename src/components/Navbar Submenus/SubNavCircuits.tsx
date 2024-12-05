import styles from "../../styles/SubNav.module.scss";

import CircuitLink from "../Links/CircuitLink";
import type { Circuit } from "../../utils/types/Circuit";

interface SubNavCircuitsProps {
  currentCircuits: Circuit[];
}

export default function SubNavCircuits(props: SubNavCircuitsProps) {
  return (
    <ul className={styles.menu}>
      {props.currentCircuits.map((circuit) => {
        return (
          <li key={circuit.circuitId} className={styles.item}>
            <CircuitLink circuit={circuit} />
          </li>
        );
      })}
    </ul>
  );
}
