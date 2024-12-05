import styles from "../../styles/SubNav.module.scss";

import CircuitLink from "../Links/CircuitLink";
import { getCurrentCircuits } from "../../utils/serverActions/home/getCurrentCircuits";

export default async function SubNavCircuits() {
  const currentCircuits = await getCurrentCircuits();

  return (
    <ul className={styles.menu}>
      {currentCircuits.map((circuit) => {
        return (
          <li key={circuit.circuitId} className={styles.item}>
            <CircuitLink circuit={circuit} />
          </li>
        );
      })}
    </ul>
  );
}
