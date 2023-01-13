import React from "react";
import Link from "next/link";
import { NavbarItem } from "../Navbar";

import styles from "../../styles/SubNav.module.scss";

const items: NavbarItem[] = [
  {
    name: "Driver World Championship",
    path: "/statistics/DriverWorldChampionship",
  },
  {
    name: "Race Wins",
    path: "/statistics/RaceWins",
  },
  {
    name: "Constructor World Championship",
    path: "/statistics/TeamWorldChampionship",
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
