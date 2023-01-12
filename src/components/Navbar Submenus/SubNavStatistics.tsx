import React from "react";
import Link from "next/link";
import { NavbarItem } from "../Navbar";

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
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubNavStatistics;
