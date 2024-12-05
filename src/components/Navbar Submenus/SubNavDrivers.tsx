import styles from "../../styles/SubNav.module.scss";

import DriverLink from "../Links/DriverLink";
import type { Driver } from "../../utils/types/Driver";

interface SubNavDriversProps {
  currentDrivers: Driver[];
}

export default function SubNavDrivers(props: SubNavDriversProps) {
  return (
    <ul className={styles.menu}>
      {props.currentDrivers.map((driver) => {
        return (
          <li key={driver.driverId} className={styles.item}>
            <DriverLink driver={driver} />
          </li>
        );
      })}
    </ul>
  );
}
