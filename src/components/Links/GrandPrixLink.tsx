import Link from "next/link";
import { GrandPrixWeekend, Race } from "../../server/trpc/router/grandPrix";

interface GrandPrixLinkProps {
  grandPrix: GrandPrixWeekend | Race;
}

const GrandPrixLink = (props: GrandPrixLinkProps) => {
  return (
    <Link href={`/grandPrixProfiles/${props.grandPrix.season}/${props.grandPrix.round}`}>
      {props.grandPrix.season}
    </Link>
  );
};

export default GrandPrixLink;
