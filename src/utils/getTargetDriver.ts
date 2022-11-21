import { DriverGuess } from "../components/GuessingGame/GameConfig";
import { trpc } from "./trpc";

export function getTargetDriver(): DriverGuess {
  // TODO
  const randomDriverID = "ocon";

  return {
    // TODO
    firstYear: "2015",
    // TODO
    lastYear: "2020",
    // TODO
    numWorldChampionships: 1,
    numWins: parseInt(
      trpc.driver.getRaceWins.useQuery({
        driverID: randomDriverID,
      }).data?.totalNum ?? "0"
    ),
    // TODO
    numPodiums: 1,
    // TODO
    numPoints: 1,
    numPoles: parseInt(
      trpc.driver.getPolePositions.useQuery({
        driverID: randomDriverID,
      }).data?.totalNum ?? "0"
    ),
    numRaceStarts: parseInt(
      trpc.driver.getRacesEntered.useQuery({
        driverID: randomDriverID,
      }).data?.totalNum ?? "0"
    ),
  };
}
