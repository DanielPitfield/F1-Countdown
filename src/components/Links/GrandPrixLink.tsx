import Link from "next/link";
import { GrandPrixWeekend, Race } from "../../server/trpc/router/grandPrix";

interface GrandPrixLinkProps {
  grandPrix: GrandPrixWeekend | Race | undefined;
  showLocation: boolean;
}

const GrandPrixLink = (props: GrandPrixLinkProps) => {
  if (!props.grandPrix) {
    return null;
  }

  const text = props.showLocation
    ? `${props.grandPrix.Circuit.Location.locality} ${props.grandPrix.season}`
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
