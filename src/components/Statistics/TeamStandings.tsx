import { TeamStanding } from "../../server/trpc/router/statistics";

import styles from "../../styles/Statistic.module.scss";

interface TeamStandingsProps {
  standings: TeamStanding[];
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
