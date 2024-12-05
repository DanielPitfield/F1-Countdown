"use client";

import React, { useState } from "react";
import Link from "next/link";
import SubNavDrivers from "./Navbar Submenus/SubNavDrivers";
import SubNavTeams from "./Navbar Submenus/SubNavTeams";
import SubNavStandings from "./Navbar Submenus/SubNavStandings";
import SubNavStatistics from "./Navbar Submenus/SubNavStatistics";
import SubNavCircuits from "./Navbar Submenus/SubNavCircuits";

import styles from "../styles/Navbar.module.scss";

export type NavbarItem = {
  name: string;
  path: string;
  subItem?: React.ReactNode;
};

const items: NavbarItem[] = [
  { name: "Schedule", path: "/Schedule" },
  { name: "Standings", path: "/Standings", subItem: <SubNavStandings /> },
  { name: "Drivers", path: "/Drivers", subItem: <SubNavDrivers /> },
  { name: "Teams", path: "/Teams", subItem: <SubNavTeams /> },
  { name: "Circuits", path: "/Circuits", subItem: <SubNavCircuits /> },
  { name: "Seasons", path: "/Seasons" },
  { name: "Grand Prixs", path: "/GrandPrixs" },
  { name: "Statistics", path: "/Statistics", subItem: <SubNavStatistics /> },
];

const Navbar = () => {
  /* TODO: Navbar sub-navigation rendering
  Bad enough that navigation bar sub-content is fetching data...
  But will the SubNav components re-render (and therefore re-fetch)? 
  (each time their main item is hovered over?)
  */
  const [currentSubMenuName, setCurrentSubMenuName] = useState<string | null>(null);

  return (
    <nav className={styles.wrapper}>
      <Link className={styles.title} href="/">
        F1 Dashboard
      </Link>

      <ul className={styles.menu}>
        {items.map((item) => (
          <li
            key={item.name}
            className={styles.item}
            onMouseEnter={() => setCurrentSubMenuName(item.name)}
            onMouseLeave={() => setCurrentSubMenuName(null)}
          >
            <Link href={item.path}>{item.name}</Link>
            {currentSubMenuName === item.name && item.subItem}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
