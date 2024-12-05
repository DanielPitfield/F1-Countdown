import type { Race } from "../utils/types/GrandPrix";
import DriverLink from "./Links/DriverLink";
import GrandPrixLink from "./Links/GrandPrixLink";

interface PreviousWinnersProps {
  previousRaces: Race[] | undefined;
}

const PreviousWinners = (props: PreviousWinnersProps) => {
  if (!props.previousRaces) {
    return null;
  }

  return (
    <div>
      <strong>Previous Winners</strong>

      {props.previousRaces.map((race) => {
        const winningDriver = race.Results[0]?.Driver;

        return (
          <div key={winningDriver?.driverId}>
            <GrandPrixLink grandPrix={race} showRaceName={false} />
            <DriverLink driver={winningDriver} />
            {`(${race.Results[0]?.Time?.time})`}
          </div>
        );
      })}
    </div>
  );
};

export default PreviousWinners;
