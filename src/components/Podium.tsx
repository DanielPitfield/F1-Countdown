import React from "react";
import { DriverRaceResult, Race } from "../server/trpc/router/grandPrix";
import DriverLink from "./Links/DriverLink";
import TeamLink from "./Links/TeamLink";

interface PodiumProps {
  race: Race | undefined;
  showTeams: boolean;
  showTimes: boolean;
}

export const Podium = (props: PodiumProps) => {
  if (!props.race) {
    return null;
  }
  
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
            <DriverLink driver={podiumStep?.Driver} />

            {props.showTeams && (
              <TeamLink team={podiumStep?.Constructor}></TeamLink>
            )}

            {props.showTimes && <span>{podiumStep?.Time?.time ?? ""}</span>}
          </div>
        );
      })}
    </div>
  );
};
