import React from "react";
import { trpc } from "../../utils/trpc";
import TeamLink from "../Links/TeamLink";

const SubNavTeams = () => {
  const { data: currentTeams } = trpc.home.getCurrentTeams.useQuery();

  if (!currentTeams) {
    return null;
  }

  return (
    <nav>
      {currentTeams.map((team) => {
        return (
          <div key={team.constructorId}>
            <TeamLink team={team} />
          </div>
        );
      })}
    </nav>
  );
};

export default SubNavTeams;
