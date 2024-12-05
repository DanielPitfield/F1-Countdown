import styles from "../styles/Podium.module.scss";

import type { Race, DriverRaceResult } from "../utils/types/GrandPrix";
import DriverLink from "./Links/DriverLink";
import TeamLink from "./Links/TeamLink";

interface PodiumProps {
  race: Race | undefined;
  showTeams: boolean;
  showTimes: boolean;
}

export enum PodiumPositions {
  FIRST = 1,
  SECOND,
  THIRD,
}

const Podium = (props: PodiumProps) => {
  if (!props.race) {
    return null;
  }

  const podiumOrder: DriverRaceResult[] = props.race.Results
    // First to last
    .sort((a, b) => {
      return parseInt(a.position) - parseInt(b.position);
    })
    // Only the podium drivers
    .slice(0, PodiumPositions.THIRD);

  return (
    <div className={styles.wrapper}>
      {podiumOrder.map((podiumStep, index) => {
        return (
          <div key={index} className={styles.step} data-position={index + 1}>
            <DriverLink driver={podiumStep?.Driver} />
            {props.showTeams && <TeamLink team={podiumStep?.Constructor} />}
            {props.showTimes && <span className={styles.time}>{podiumStep?.Time?.time ?? ""}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Podium;
