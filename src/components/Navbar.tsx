import React from "react";
import Link from "next/link";
import SubNavDrivers from "./Navbar Submenus/SubNavDrivers";
import SubNavTeams from "./Navbar Submenus/SubNavTeams";
import SubNavStandings from "./Navbar Submenus/SubNavStandings";
import SubNavStatistics from "./Navbar Submenus/SubNavStatistics";

import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  const items: string[] = [
    "Schedule",
    "Standings",
    "Drivers",
    "Teams",
    "Circuits",
    "Seasons",
    "Grand Prixs",
    "Statistics",
  ];

  /* TODO: Navbar sub-navigation rendering
  Bad enough that navigation bar sub-content is fetching data...
  But will the SubNav components re-render (and therefore re-fetch)? 
  (each time their main item is hovered over?)
  */
  return (
    <>
      <nav className={styles.wrapper}>
        <Link className={styles.title} href="/">
          F1 Dashboard
        </Link>

        <ul className={styles.menu}>
          {items.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <SubNavDrivers />
      <SubNavTeams />
      <SubNavStandings />
      <SubNavStatistics />
    </>
  );
};

export default Navbar;
