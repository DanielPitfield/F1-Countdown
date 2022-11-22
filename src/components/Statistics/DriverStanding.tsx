import { DriverStanding } from "../../server/trpc/router/statistics";

import styles from "../../styles/statistics/DriverChampion.module.scss";

interface DriverStandingProps {
  standing: DriverStanding;
}

const DriverStanding = (props: DriverStandingProps) => {
  const driver = props.standing.Driver;
  const fullName = `${driver?.givenName} ${driver?.familyName}`;

  return (
    <div className={styles.wrapper}>
      <div>{`${props.standing.position} ${fullName} (${props.standing.Constructors[0]?.name})`}</div>
      <div>{props.standing.points}</div>
    </div>
  );
};

export default DriverStanding;
