import Link from "next/link";
import { GrandPrixWeekend, Race } from "../../server/trpc/router/grandPrix";

interface GrandPrixLinkProps {
  grandPrix: GrandPrixWeekend | Race | undefined;
  showRaceName: boolean;
}

const GrandPrixLink = (props: GrandPrixLinkProps) => {
  if (!props.grandPrix) {
    return null;
  }

  const text = props.showRaceName
    ? `${props.grandPrix.season} ${props.grandPrix.raceName}`
    : props.grandPrix.season;

  return (
    <Link
      href={`/grandPrixProfiles/${props.grandPrix.season}/${props.grandPrix.round}`}
    >
      {text}
    </Link>
  );
};

export default GrandPrixLink;
