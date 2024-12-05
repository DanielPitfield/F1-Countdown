import styles from "../../styles/SubNav.module.scss";

import Link from "next/link";
import { NavbarItem } from "../Navbar";

const items: NavbarItem[] = [
  {
    name: "Driver Standings",
    path: "/standings/CurrentDriverStandings",
  },
  {
    name: "Constructor Standings",
    path: "/standings/CurrentTeamStandings",
  },
];

const SubNavStandings = () => {
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

export default SubNavStandings;
