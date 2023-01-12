import Link from "next/link";
import React from "react";

const SubNavStandings = () => {
  return (
    <nav>
      <Link href="/Statistics/">Driver Standings</Link>
      <Link>Constructor Standings</Link>
    </nav>
  );
};

export default SubNavStandings;
