import RaceWinner from "../../../components/Statistics/RaceWinner";
import { getRaceWinnerHistoryPart1 } from "../../../utils/serverActions/statistics/getRaceWinnerHistoryPart1";
import { getRaceWinnerHistoryPart2 } from "../../../utils/serverActions/statistics/getRaceWinnerHistoryPart2";
import type { Race } from "../../../utils/types/GrandPrix";

export default async function Page() {
  const [historyPart1, historyPart2] = await Promise.all([getRaceWinnerHistoryPart1(), getRaceWinnerHistoryPart2()]);

  const history = historyPart1.concat(historyPart2);
  const uniqueRaceWinners = Array.from(new Set(history.map((race) => race.Results[0]?.Driver.driverId)));

  // Descending order (of number of races won)
  uniqueRaceWinners.sort((a, b) => {
    return (
      history.filter((race) => race.Results[0]?.Driver.driverId === b).length -
      history.filter((race) => race.Results[0]?.Driver.driverId === a).length
    );
  });

  return (
    <div>
      {uniqueRaceWinners.map((raceWinnerID) => {
        const racesWon: Race[] = history.filter((race) => race.Results[0]?.Driver.driverId === raceWinnerID);
        return <RaceWinner key={raceWinnerID} racesWon={racesWon} />;
      })}
    </div>
  );
}
