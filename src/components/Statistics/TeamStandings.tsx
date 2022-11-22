import { TeamStanding as TeamStandings } from "../../server/trpc/router/statistics";

import styles from "../../styles/Statistic.module.scss";

interface TeamStandingsProps {
  standings: TeamStandings[];
}

const TeamStandings = (props: TeamStandingsProps) => {
  return (
    <div>
      {props.standings?.map((standing) => {
        return (
          <div key={standing.Constructor.name} className={styles.wrapper}>
            <div>{`${standing.position} ${standing.Constructor.name}`}</div>
            <div>{standing.points}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamStandings;
