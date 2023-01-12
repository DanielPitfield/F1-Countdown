import Link from "next/link";
import React from "react";

const SubNavStatistics = () => {
  return (
    <nav>
      <Link href="/statistics/DriverWorldChampionship">
        Driver World Championship
      </Link>
      <Link href="/statistics/RaceWins">Race Wins</Link>
      <Link href="/statistics/TeamWorldChampionship">
        Constructor World Championship
      </Link>
    </nav>
  );
};

export default SubNavStatistics;
