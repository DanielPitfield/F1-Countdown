import React from "react";
import { trpc } from "../../utils/trpc";
import TeamLink from "../Links/TeamLink";

const SubNavTeams = () => {
  const { data: currentTeams } = trpc.home.getCurrentTeams.useQuery();

  if (!currentTeams) {
    return null;
  }

  return (
    <ul>
      {currentTeams.map((team) => {
        return (
          <li key={team.constructorId}>
            <TeamLink team={team} />
          </li>
        );
      })}
    </ul>
  );
};

export default SubNavTeams;
