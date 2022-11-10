import React, { useState } from "react";
import Game from "./Game";

export interface GameConfigProps {
  startingNumGuesses: number;
  isHintShown: boolean;
}

const GameConfig = (props: GameConfigProps) => {
  const [inProgress, setInProgress] = useState(true);
  const [remainingGuesses, setRemainingGuesses] = useState(
    props.startingNumGuesses
  );

  const [currentDriverGuess, setCurrentDriverGuess] = useState("");
  const [targetDriver, setTargetDriver] = useState("");
  const [targetHint, setTargetHint] = useState("");

  const [guesses, setGuesses] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);

  function ResetGame() {
    setInProgress(true);
    setRemainingGuesses(props.startingNumGuesses);

    setCurrentDriverGuess("");

    setGuesses([]);
    setWordIndex(0);
  }

  function onEnter() {
    // No target driver yet
    if (!targetDriver) {
      return;
    }

    // Used all guesses
    if (wordIndex >= remainingGuesses) {
      return;
    }

    // TODO: If a driver has been selected, then add to guesses

    setGuesses(guesses.concat(currentDriverGuess));

    // TODO: Exact match
    // if () {
    setInProgress(false);
    return;
    // }

    // Out of guesses
    if (wordIndex + 1 === remainingGuesses) {
      setInProgress(false);
      return;
    }

    // Otherwise
    setCurrentDriverGuess("");
    setWordIndex(wordIndex + 1); // Increment index to indicate new word has been started
  }

  return (
    <Game
      inProgress={inProgress}
      remainingGuesses={remainingGuesses}
      currentDriverGuess={currentDriverGuess}
      targetDriver={targetDriver ?? ""}
      targetHint={props.isHintShown ? targetHint : ""}
      guesses={guesses}
      wordIndex={wordIndex}
      onEnter={onEnter}
      ResetGame={ResetGame}
    />
  );
};

export default GameConfig;
