import type { NextPage } from "next";
import GameConfig from "../components/GuessingGame/GameConfig";

const GuessingGame: NextPage = () => {
  return (
    <div className="wrapper">
      <GameConfig startingNumGuesses={10} />
    </div>
  );
};

export default GuessingGame;
