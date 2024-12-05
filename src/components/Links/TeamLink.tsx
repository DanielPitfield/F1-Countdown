import Link from "next/link";
import type { Team } from "../../utils/types/Team";

interface TeamLinkProps {
  team: Team | undefined;
}

const TeamLink = (props: TeamLinkProps) => {
  if (!props.team) {
    return null;
  }

  return <Link href={`/teamProfiles/${props.team.constructorId}`}>{props.team.name}</Link>;
};

export default TeamLink;
