import GameConfig from "../components/GuessingGame/GameConfig";

const GuessingGame = () => {
  return (
    <div className="wrapper">
      <GameConfig startingNumGuesses={10} />
    </div>
  );
};

export default GuessingGame;
