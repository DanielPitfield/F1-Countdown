import React from "react";
import { trpc } from "../../utils/trpc";
import CircuitLink from "../Links/CircuitLink";

import styles from "../../styles/SubNav.module.scss";

const SubNavCircuits = () => {
  const { data: currentCircuits } = trpc.home.getCurrentCircuits.useQuery();

  if (!currentCircuits) {
    return null;
  }

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
};

export default SubNavCircuits;
