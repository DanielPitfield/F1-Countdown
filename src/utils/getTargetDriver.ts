import { getYear } from "date-fns";
import { DriverGuess } from "../components/GuessingGame/GameConfig";
import { trpc } from "./trpc";

export function getTargetDriver(): DriverGuess {
  // TODO: Random driverID from prisma context
  const randomDriverID = "ocon";

  const { data: championshipResults } =
    trpc.driver.getChampionshipResults.useQuery({
      driverID: randomDriverID,
    });

  const { data: racesEntered } = trpc.driver.getRacesEntered.useQuery({
    driverID: randomDriverID,
  });

  const { data: polePositions } = trpc.driver.getPolePositions.useQuery({
    driverID: randomDriverID,
  });

  const { data: raceWins } = trpc.driver.getRaceWins.useQuery({
    driverID: randomDriverID,
  });

  const currentYear = getYear(new Date()).toString();

  return {
    firstYear: championshipResults?.allYears[0]?.season ?? currentYear,
    lastYear: championshipResults?.allYears.at(-1)?.season ?? currentYear,
    numWorldChampionships: championshipResults?.numChampionshipsWon ?? 0,
    numWins: raceWins?.totalNum ?? 0,
    numPodiums: racesEntered?.numPodiums ?? 0,
    // TODO: getDriverTotalNumPoints() helper function
    numPoints: 1,
    numPoles: polePositions?.totalNum ?? 0,
    numRaceStarts: racesEntered?.totalNum ?? 0,
  };
}
