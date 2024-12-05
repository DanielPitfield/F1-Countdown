"use client";

import styles from "../styles/Navbar.module.scss";

import type { Circuit } from "../utils/types/Circuit";
import type { Driver } from "../utils/types/Driver";
import type { Team } from "../utils/types/Team";

import React, { useState } from "react";
import Link from "next/link";
import SubNavDrivers from "./Navbar Submenus/SubNavDrivers";
import SubNavTeams from "./Navbar Submenus/SubNavTeams";
import SubNavStandings from "./Navbar Submenus/SubNavStandings";
import SubNavStatistics from "./Navbar Submenus/SubNavStatistics";
import SubNavCircuits from "./Navbar Submenus/SubNavCircuits";

export type NavbarItem = {
  name: string;
  path: string;
  subItem?: React.ReactNode;
};

interface NavbarProps {
  currentDrivers: Driver[];
  currentTeams: Team[];
  currentCircuits: Circuit[];
}

const Navbar = (props: NavbarProps) => {
  const items: NavbarItem[] = [
    // { name: "Schedule", path: "/Schedule" },
    { name: "Standings", path: "/Standings", subItem: <SubNavStandings /> },
    { name: "Drivers", path: "/Drivers", subItem: <SubNavDrivers currentDrivers={props.currentDrivers} /> },
    { name: "Teams", path: "/Teams", subItem: <SubNavTeams currentTeams={props.currentTeams} /> },
    { name: "Circuits", path: "/Circuits", subItem: <SubNavCircuits currentCircuits={props.currentCircuits} /> },
    // { name: "Seasons", path: "/Seasons" },
    // { name: "Grand Prixs", path: "/GrandPrixs" },
    { name: "Statistics", path: "/Statistics", subItem: <SubNavStatistics /> },
  ];

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
            <div>{item.name}</div>
            {currentSubMenuName === item.name && item.subItem}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
