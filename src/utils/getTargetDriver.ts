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
    numWins: trpc.driver.getRaceWins.useQuery({
      driverID: randomDriverID,
      isReturnOnlyTotalNum: true,
    }).data,
    // TODO
    numPodiums: 1,
    // TODO
    numPoints: 1,
    numPoles: trpc.driver.getPolePositions.useQuery({
      driverID: randomDriverID,
      isReturnOnlyTotalNum: true,
    }).data,
    numRaceStarts: trpc.driver.getRacesEntered.useQuery({
      driverID: randomDriverID,
      isReturnOnlyTotalNum: true,
    }).data,
  };
}
