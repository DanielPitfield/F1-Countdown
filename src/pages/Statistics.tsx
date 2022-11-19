// TODO: Different pages for the different statistics

import RaceWins from "../components/Statistics/RaceWins";

const Statistics = () => {
  return (
    <div className="wrapper">
      <RaceWins numWinners={50}/>
    </div>
  );
};

export default Statistics;
