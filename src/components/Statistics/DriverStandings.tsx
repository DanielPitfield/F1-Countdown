import { DriverStanding } from "../../server/trpc/router/statistics";
import { getDriverName } from "../../utils/getDriverName";
import Link from "next/link";

import styles from "../../styles/Statistic.module.scss";
import DriverLink from "../Links/DriverLink";
import TeamLink from "../Links/TeamLink";

interface DriverStandingsProps {
  standings: DriverStanding[];
}

// TODO: DriverLink (and similar) component?

const DriverStandings = (props: DriverStandingsProps) => {
  return (
    <div>
      {props.standings?.map((standing) => {
        return (
          <div key={standing.Driver.driverId} className={styles.wrapper}>
            <div>
              {standing.position}
              <DriverLink driver={standing.Driver} />
              <TeamLink team={standing.Constructors[0]} />
            </div>

            <div>{standing.points}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverStandings;
