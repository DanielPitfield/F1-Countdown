import Link from "next/link";
import React from "react";
import { DriverRaceResult, Race } from "../server/trpc/router/race";

import { getDriverName } from "../utils/getDriverName";

interface PodiumProps {
  race: Race;
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
    // TODO: Podium Steps CSS, different heights, second place on left, first place in middle, third place on right
    <div>
      <strong>Podium</strong>
      {podiumOrder.map((podiumStep, index) => {
        return (
          <div key={index}>
            <Link
              key={podiumStep?.Driver.driverId}
              href={`/driverProfiles/${podiumStep?.Driver.driverId}`}
            >
              {getDriverName(podiumStep?.Driver)}
            </Link>

            {props.showTeams && (
              <Link
                key={podiumStep?.Constructor.constructorId}
                href={`/teamProfiles/${podiumStep?.Constructor.constructorId}`}
              >
                {podiumStep?.Constructor.name ?? ""}
              </Link>
            )}
            {props.showTimes && <span>{podiumStep?.Time?.time ?? ""}</span>}
          </div>
        );
      })}
    </div>
  );
};
