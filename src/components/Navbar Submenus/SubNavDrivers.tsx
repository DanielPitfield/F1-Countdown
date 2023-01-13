import React from "react";
import { trpc } from "../../utils/trpc";
import DriverLink from "../Links/DriverLink";

import styles from "../../styles/SubNav.module.scss";

const SubNavDrivers = () => {
  const { data: currentDrivers } = trpc.home.getCurrentDrivers.useQuery();

  if (!currentDrivers) {
    return null;
  }

  return (
    <ul className={styles.menu}>
      {currentDrivers.map((driver) => {
        return (
          <li key={driver.driverId} className={styles.item}>
            <DriverLink driver={driver} />
          </li>
        );
      })}
    </ul>
  );
};

export default SubNavDrivers;
