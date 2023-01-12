import { TeamStanding } from "../server/trpc/router/statistics";
import TeamLink from "./Links/TeamLink";

import styles from "../../styles/Statistic.module.scss";

interface TeamStandingsProps {
  standings: TeamStanding[] | undefined;
}

const TeamStandings = (props: TeamStandingsProps) => {
  if (!props.standings) {
    return null;
  }
  
  return (
    <div>
      {props.standings?.map((standing) => {
        return (
          <div
            key={standing.Constructor.constructorId}
            className={styles.wrapper}
          >
            <div>
              {standing.position}
              <TeamLink team={standing.Constructor} />
            </div>

            <div>{standing.points}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamStandings;
