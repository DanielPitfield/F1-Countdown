import { PodiumPositions } from "../components/Podium";
import { Race } from "../server/trpc/router/grandPrix";

export function filterPodiums(races: Race[]): Race[] {
  return races.filter((race: Race) => {
    const racePosition: number = parseInt(race.Results[0]?.position ?? "0");
    
    return (
      racePosition >= PodiumPositions.FIRST &&
      racePosition <= PodiumPositions.THIRD
    );
  });
}
