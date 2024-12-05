import styles from "../../styles/SubNav.module.scss";

import Link from "next/link";
import { NavbarItem } from "../Navbar";

const items: NavbarItem[] = [
  {
    name: "Race Wins",
    path: "/statistics/raceWins",
  },
  {
    name: "Driver World Championship",
    path: "/statistics/driverWorldChampionships",
  },
  {
    name: "Constructor World Championship",
    path: "/statistics/constructorWorldChampionships",
  },
];

const SubNavStatistics = () => {
  return (
    <ul className={styles.menu}>
      {items.map((item) => (
        <li key={item.name} className={styles.item}>
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubNavStatistics;
