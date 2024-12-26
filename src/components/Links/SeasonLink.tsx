import Link from "next/link";
import { CSSProperties } from "react";

interface SeasonLinkProps {
  season: string | undefined;
  style?: CSSProperties;
}

const SeasonLink = (props: SeasonLinkProps) => {
  if (!props.season) {
    return null;
  }

  return (
    <Link style={props.style} href={`/seasons/${props.season}`}>
      {props.season}
    </Link>
  );
};

export default SeasonLink;
