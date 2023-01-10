import Link from "next/link";
import React from "react";

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

  return (
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
  );
};

export default Navbar;
