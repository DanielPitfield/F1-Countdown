import Link from "next/link";
import type { Team } from "../../utils/types/Team";
import { CSSProperties } from "react";

interface TeamLinkProps {
  team: Team | undefined;
  style?: CSSProperties;
}

const TeamLink = (props: TeamLinkProps) => {
  if (!props.team) {
    return null;
  }

  return (
    <Link style={props.style} href={`/teams/${props.team.constructorId}`}>
      {props.team.name}
    </Link>
  );
};

export default TeamLink;
