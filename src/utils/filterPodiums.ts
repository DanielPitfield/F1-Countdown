import { PodiumPositions } from "../components/Podium";
import { Race } from "./types/GrandPrix";

// TODO: How does this handle both drivers of a team being on the podium (does that count as 1 or 2?)
export function filterPodiums(races: Race[]): Race[] {
  return races.filter((race: Race) => {
    const racePosition: number = parseInt(race.Results[0]?.position ?? "0");

    return racePosition >= PodiumPositions.FIRST && racePosition <= PodiumPositions.THIRD;
  });
}
