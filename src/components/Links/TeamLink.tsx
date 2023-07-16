import Link from "next/link";
import { Team } from "../../server/trpc/router/team";

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
