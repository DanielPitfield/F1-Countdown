import Link from "next/link";
import { Race } from "../../server/trpc/router/grandPrix";

interface SeasonLinkProps {
  season: Race[] | undefined;
  showRaceName: boolean;
}

const SeasonLink = (props: SeasonLinkProps) => {
  if (!props.season) {
    return null;
  }

  const year = props.season[0]?.season;

  return <Link href={`/seasonProfiles/${year}`}>{year}</Link>;
};

export default SeasonLink;
