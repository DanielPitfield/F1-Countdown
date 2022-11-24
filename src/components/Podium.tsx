import React from "react";
import { DriverRaceResult, RaceInfo } from "../server/trpc/router/race";
import { getDriverName } from "../utils/getDriverName";

interface PodiumProps {
  race: RaceInfo;
  showTeams: boolean;
  showTimes: boolean;
}

export const Podium = (props: PodiumProps) => {
  const NUM_PODIUM_STEPS = 3;

  const podiumOrder: DriverRaceResult[] = props.race.Results
    // First to last
    .sort((a, b) => {
      return parseInt(a.position) - parseInt(b.position);
    })
    // Only the podium drivers
    .slice(0, NUM_PODIUM_STEPS);

  return (
    <div>
      <strong>Podium</strong>
      {podiumOrder.map((podiumStep, index) => {
        return (
          <div key={index}>
            {<span>{getDriverName(podiumStep?.Driver)}</span>}
            {props.showTeams && (
              <span>{podiumStep?.Constructor.name ?? ""}</span>
            )}
            {props.showTimes && <span>{podiumStep?.Time.time ?? ""}</span>}
          </div>
        );
      })}
    </div>
  );
};
