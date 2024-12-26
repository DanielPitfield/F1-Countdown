import Link from "next/link";
import type { GrandPrixWeekend, Race } from "../../utils/types/GrandPrix";
import { CSSProperties } from "react";

interface GrandPrixLinkProps {
  grandPrix: GrandPrixWeekend | Race | undefined;
  showRaceName: boolean;
  style?: CSSProperties;
}

const GrandPrixLink = (props: GrandPrixLinkProps) => {
  if (!props.grandPrix) {
    return null;
  }

  const text = props.showRaceName ? `${props.grandPrix.season} ${props.grandPrix.raceName}` : props.grandPrix.season;

  return (
    <Link style={props.style} href={`/grandPrixs/${props.grandPrix.season}/${props.grandPrix.round}`}>
      {text}
    </Link>
  );
};

export default GrandPrixLink;
