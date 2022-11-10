import GameTile from "./GameTile";

interface Props {
  length: number;
  currentDriverGuess: string;
  targetDriver: string;
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
        props.hasSubmit && props.currentDriverGuess === props.targetDriver
      )}
    >
      {Array(props.length)
        .fill("")
        .map((_, index) => {
          return (
            <GameTile
              key={index}
              value={props.currentDriverGuess?.[index] ?? ""}
              status={"not set" /* TODO: Get Status */}
            />
          );
        })}
    </div>
  );
};
