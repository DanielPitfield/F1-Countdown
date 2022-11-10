import React from "react";
import { Button } from "../Button";
import { GameRow } from "./GameRow";

interface Props {
  inProgress: boolean;
  remainingGuesses: number;

  currentDriverGuess: string;
  targetDriver: string;
  targetHint?: string;

  guesses: string[];
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
        /*
        If the wordIndex is behind the currently iterated row
        (i.e the row has not been used yet)
        Show an empty string 
        */
        rowValue = "";
      } else if (props.wordIndex === i) {
        /* 
        If the wordIndex and the row number are the same
        (i.e the row is currently being used)
        Show the currentWord
        */
        rowValue = props.currentDriverGuess;
      } else {
        /* 
        If the wordIndex is ahead of the currently iterated row
        (i.e the row has already been used)
        Show the respective guessed word
        */
        rowValue = props.guesses[i];
      }

      Grid.push(
        <GameRow
          key={`game/row/${i}`}
          length={props.targetDriver.length}
          currentDriverGuess={rowValue ?? ""}
          targetDriver={props.targetDriver}
          hasSubmit={props.wordIndex > i || !props.inProgress}
          applyAnimation={props.wordIndex === i}
        />
      );
    }

    return <div className="game-grid">{Grid}</div>;
  };

  const Hint = () => {
    if (!props.targetHint) {
      return null;
    }

    // Display the hint (if defined)
    return (
      <div>
        <strong>Hint:</strong> {props.targetHint}
      </div>
    );
  };

  return (
    <div>
      <Hint />

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
