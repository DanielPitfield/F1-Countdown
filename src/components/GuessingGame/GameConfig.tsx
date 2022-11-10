import React, { useState } from "react";
import { getTargetDriver } from "../../utils/getTargetDriver";
import Game from "./Game";

export interface GameConfigProps {
  startingNumGuesses: number;
}

export type DriverGuess = {
  firstYear: string;
  lastYear: string;
  numWorldChampionships: number;
  numWins: number;
  numPodiums: number;
  numPoints: number;
  numPoles: number;
  numRaceStarts: number;
};

const GameConfig = (props: GameConfigProps) => {
  const [inProgress, setInProgress] = useState(true);
  const [remainingGuesses, setRemainingGuesses] = useState(
    props.startingNumGuesses
  );

  const [currentDriverGuess, setCurrentDriverGuess] =
    useState<DriverGuess | null>(null);
  const [targetDriver, setTargetDriver] = useState<DriverGuess>(getTargetDriver());

  const [guesses, setGuesses] = useState<DriverGuess[]>([]);
  const [wordIndex, setWordIndex] = useState(0);

  function ResetGame() {
    setInProgress(true);
    setRemainingGuesses(props.startingNumGuesses);

    setCurrentDriverGuess(null);
    setTargetDriver(getTargetDriver());

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

    // Selected a driver as a guess
    if (currentDriverGuess) {
      const newGuesses = guesses.concat(currentDriverGuess);
      setGuesses(newGuesses);
    }

    // Exact answer
    if (currentDriverGuess === targetDriver) {
      setInProgress(false);
      return;
    }

    // Out of guesses
    if (wordIndex + 1 === remainingGuesses) {
      setInProgress(false);
      return;
    }

    // Move on to next row
    setCurrentDriverGuess(null);
    setWordIndex(wordIndex + 1);
  }

  return (
    <Game
      inProgress={inProgress}
      remainingGuesses={remainingGuesses}
      currentDriverGuess={currentDriverGuess}
      targetDriver={targetDriver}
      guesses={guesses}
      wordIndex={wordIndex}
      onEnter={onEnter}
      ResetGame={ResetGame}
    />
  );
};

export default GameConfig;
