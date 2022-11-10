import GameConfig from "../components/GuessingGame/GameConfig";

const GuessingGame = () => {
  return (
    <div className="wrapper">
      <GameConfig startingNumGuesses={10} isHintShown={false} />
    </div>
  );
};

export default GuessingGame;
