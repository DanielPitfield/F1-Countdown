import React from "react";

export type GameTileStatus = {
  value: string;
  status: Status;
};

export type Status =
  | "incorrect"
  | "contains"
  | "correct"
  | "not set"
  | "not in word";

interface Props {
  value: string;
  status: Status;
  disabled?: boolean;
  applyAnimation?: boolean;
}

const GameTile = (props: Props) => {
  return (
    // [data-apply-animation="false"] - No animations are applied to LetterTile
    // [data-new-letter-added="true"] - Pop animation is applied to LetterTile
    // [data-has-been-submitted="true"] - Reveal animation is applied to LetterTile
    <div
      className="game-tile"
      data-apply-animation={props.applyAnimation}
      data-new-letter-added={
        props.status === "not set" && props.value !== undefined
      }
      data-has-been-submitted={
        props.status !== "not set" &&
        props.status !== "incorrect" &&
        props.value !== undefined
      }
      data-status={props.status}
      data-disabled={props.disabled}
    >
      {props.value}
    </div>
  );
};

export default GameTile;
