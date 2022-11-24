import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import RaceWinner from "../../components/Statistics/RaceWinner";
import { RaceInfo } from "../../server/trpc/router/race";

const RaceWins: NextPage = () => {
  const { data: historyPart1 } =
    trpc.statistics.getRaceWinnerHistoryPart1.useQuery();

  const { data: historyPart2 } =
    trpc.statistics.getRaceWinnerHistoryPart2.useQuery();

  if (!historyPart1 || !historyPart2) {
    return null;
  }

  const history = historyPart1.concat(historyPart2);

  const uniqueRaceWinners = Array.from(
    new Set(history.map((race) => race.Results[0]?.Driver.driverId))
  );

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
        const racesWon: RaceInfo[] = history.filter(
          (race) => race.Results[0]?.Driver.driverId === raceWinnerID
        );

        return <RaceWinner key={raceWinnerID} racesWon={racesWon} />;
      })}
    </div>
  );
};

export default RaceWins;
