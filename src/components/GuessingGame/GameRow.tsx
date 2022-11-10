import { DriverGuess } from "./GameConfig";
import GameTile from "./GameTile";

interface Props {
  length: number;
  driverGuess: DriverGuess | null;
  targetDriver: DriverGuess | null;
  hasSubmit: boolean;
  applyAnimation?: boolean;
}

export const GameRow = (props: Props) => {
  return (
    // [data-apply-animation="false"] - No animations are applied to WordRow
    // [data-correct-word-submitted="true"] - Jump animation is applied to WordRow

    <div
      className="game-row"
      data-apply-animation={props.applyAnimation}
      data-correct-word-submitted={Boolean(
        props.hasSubmit && props.driverGuess === props.targetDriver
      )}
    >
      {Array(props.length)
        .fill("")
        .map((_, index) => {
          return (
            <GameTile
              key={index}
              value={
                props.driverGuess
                  ? Object.values(props.driverGuess)[index]?.toString() ?? ""
                  : ""
              }
              status={"not set" /* TODO: Get Status */}
            />
          );
        })}
    </div>
  );
};
