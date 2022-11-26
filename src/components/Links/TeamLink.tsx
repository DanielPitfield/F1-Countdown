import Link from "next/link";
import { Team } from "../../server/trpc/router/team";

interface TeamLinkProps {
  team: Team;
}

const TeamLink = (props: TeamLinkProps) => {
  return (
    <Link href={`/teamProfiles/${props.team.constructorId}`}>
      {props.team.name}
    </Link>
  );
};

export default TeamLink;
