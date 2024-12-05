import styles from "../../styles/SubNav.module.scss";

import DriverLink from "../Links/DriverLink";
import { getCurrentDrivers } from "../../utils/serverActions/home/getCurrentDrivers";

export default async function SubNavDrivers() {
  const currentDrivers = await getCurrentDrivers();

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
}
