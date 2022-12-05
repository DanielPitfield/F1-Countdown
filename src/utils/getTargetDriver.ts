import { DriverGuess } from "../components/GuessingGame/GameConfig";
import { getCurrentYear } from "./getCurrentYear";
import { trpc } from "./trpc";

export function getTargetDriver(): DriverGuess {
  // TODO: Random driverID from prisma context
  const randomDriverID = "ocon";

  const { data: championshipResults } =
    trpc.driver.getChampionshipResults.useQuery({
      driverID: randomDriverID,
    });

  const { data: races } = trpc.driver.getRaces.useQuery({
    driverID: randomDriverID,
  });

  const { data: polePositions } = trpc.driver.getPolePositions.useQuery({
    driverID: randomDriverID,
  });

  return {
    firstYear: championshipResults?.allYears[0]?.season ?? getCurrentYear(),
    lastYear: championshipResults?.allYears.at(-1)?.season ?? getCurrentYear(),
    numWorldChampionships: championshipResults?.numChampionshipsWon ?? 0,
    numWins: races?.numWins ?? 0,
    numPodiums: races?.numPodiums ?? 0,
    numPoints: championshipResults?.numCareerPoints ?? 0,
    numPoles: polePositions?.totalNum ?? 0,
    numRaceStarts: races?.numRacesEntered ?? 0,
  };
}
