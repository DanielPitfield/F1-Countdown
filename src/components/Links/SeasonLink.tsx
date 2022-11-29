import Link from "next/link";

interface SeasonLinkProps {
  season: string | undefined;
}

const SeasonLink = (props: SeasonLinkProps) => {
  if (!props.season) {
    return null;
  }

  return <Link href={`/seasonProfiles/${props.season}`}>{props.season}</Link>;
};

export default SeasonLink;
