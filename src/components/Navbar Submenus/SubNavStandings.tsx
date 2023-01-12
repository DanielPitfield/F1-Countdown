import Link from "next/link";
import React from "react";
import { NavbarItem } from "../Navbar";

const items: NavbarItem[] = [
  {
    name: "Current Driver Standings",
    path: "/standings/CurrentDriverStandings",
  },
  {
    name: "Constructor Standings",
    path: "/standings/CurrentTeamStandings",
  },

];

const SubNavStandings = () => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubNavStandings;
