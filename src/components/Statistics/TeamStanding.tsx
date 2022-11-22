import { TeamStanding } from "../../server/trpc/router/statistics";

import styles from "../../styles/statistics/DriverChampion.module.scss";

interface TeamStandingProps {
  standing: TeamStanding;
}

const TeamStanding = (props: TeamStandingProps) => {
  return (
    <div className={styles.wrapper}>
      <div>{`${props.standing.position} ${props.standing.Constructor.name}`}</div>
      <div>{props.standing.points}</div>
    </div>
  );
};

export default TeamStanding;
