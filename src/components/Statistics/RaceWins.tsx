import { trpc } from "../../utils/trpc";
import { RaceHistory } from "../../server/trpc/router/statistics";
import RaceWinner from "../RaceWinner";

import styles from "../../styles/statistics/DriverWorldChampionship.module.scss";

interface RaceWinsProps {
  numWinners: number;
}

const RaceWins = (props: RaceWinsProps) => {
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
    <div className={styles.wrapper}>
      {uniqueRaceWinners.slice(0, props.numWinners).map((raceWinnerID) => {
        const racesWon: RaceHistory[] = history.filter(
          (race) => race.Results[0]?.Driver.driverId === raceWinnerID
        );

        return <RaceWinner key={raceWinnerID} racesWon={racesWon} />;
      })}
    </div>
  );
};

export default RaceWins;
