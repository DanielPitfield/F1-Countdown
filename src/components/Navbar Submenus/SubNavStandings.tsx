import Link from "next/link";
import React from "react";

const SubNavStandings = () => {
  return (
    <nav>
      <Link href="/standings/CurrentDriverStandings">Driver Standings</Link>
      <Link href="/standings/CurrentTeamStandings">Constructor Standings</Link>
    </nav>
  );
};

export default SubNavStandings;
