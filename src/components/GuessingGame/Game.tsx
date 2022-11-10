import React from "react";
import { Button } from "../Button";
import { DriverGuess } from "./GameConfig";
import { GameRow } from "./GameRow";

interface Props {
  inProgress: boolean;
  remainingGuesses: number;

  currentDriverGuess: DriverGuess | null;
  targetDriver: DriverGuess | null;

  guesses: DriverGuess[];
  wordIndex: number;

  onEnter: () => void;
  ResetGame: () => void;
}

const Game = (props: Props) => {
  const Grid = () => {
    const Grid = [];

    for (let i = 0; i < props.remainingGuesses; i++) {
      let rowValue;

      if (props.wordIndex < i) {
        // Row not used yet
        rowValue = null;
      } else if (props.wordIndex === i) {
        // Current row
        rowValue = props.currentDriverGuess;
      } else {
        // A previously used row
        rowValue = props.guesses[i];
      }

      Grid.push(
        <GameRow
          key={`game/row/${i}`}
          length={Object.keys(props.targetDriver ?? {}).length}
          driverGuess={rowValue ?? null}
          targetDriver={props.targetDriver}
          hasSubmit={props.wordIndex > i || !props.inProgress}
          applyAnimation={props.wordIndex === i}
        />
      );
    }

    return <div className="game-grid">{Grid}</div>;
  };

  return (
    <div>
      <div>
        {!props.inProgress && (
          <Button mode={"accept"} onClick={() => props.ResetGame()}>
            Restart
          </Button>
        )}
      </div>

      <Grid />
    </div>
  );
};

export default Game;
