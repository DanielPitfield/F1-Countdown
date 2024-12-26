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
    <div style={{ display: "flex", flexDirection: "column", padding: "1em" }}>
      <strong>Previous Winners</strong>

      {props.previousRaces.map((race) => {
        const winningDriver = race.Results[0]?.Driver;

        return (
          <div key={`${winningDriver?.driverId} - ${race.season}`} style={{ display: "flex", padding: "0.25em 0" }}>
            <GrandPrixLink style={{ marginRight: "0.5em" }} grandPrix={race} showRaceName={false} />
            <DriverLink driver={winningDriver} />
          </div>
        );
      })}
    </div>
  );
};

export default PreviousWinners;
