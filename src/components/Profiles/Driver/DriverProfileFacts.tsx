import { trpc } from "../../../utils/trpc";
import SeasonLink from "../../Links/SeasonLink";
import GrandPrixLink from "../../Links/GrandPrixLink";
import { Fact } from "../../Fact";

import styles from "../../../styles/DriverProfile.module.scss";

interface DriverProfileFactsProps {
  driverID: string;
}

const DriverProfileFacts = (props: DriverProfileFactsProps) => {
  const { data: racesEntered } = trpc.driver.getRacesEntered.useQuery({
    driverID: props.driverID,
  });

  const { data: polePositions } = trpc.driver.getPolePositions.useQuery({
    driverID: props.driverID,
  });

  const { data: raceWins } = trpc.driver.getRaceWins.useQuery({
    driverID: props.driverID,
  });

  const { data: numFastestLaps } = trpc.driver.getNumFastestLaps.useQuery({
    driverID: props.driverID,
  });

  const { data: championshipResults } =
    trpc.driver.getChampionshipResults.useQuery({ driverID: props.driverID });

  return (
    <div>
      <div className={styles.facts}>
        <Fact label="First Pole">
          <GrandPrixLink
            grandPrix={polePositions?.firstPole}
            showRaceName={true}
          />
        </Fact>
        <Fact label="Last Pole">
          <GrandPrixLink
            grandPrix={polePositions?.lastPole}
            showRaceName={true}
          />
        </Fact>
        <Fact label="First Race">
          <GrandPrixLink
            grandPrix={racesEntered?.firstRace}
            showRaceName={true}
          />
        </Fact>
        <Fact label="Last Race">
          <GrandPrixLink
            grandPrix={racesEntered?.lastRace}
            showRaceName={true}
          />
        </Fact>

        <Fact label="First Win">
          <GrandPrixLink grandPrix={raceWins?.firstWin} showRaceName={true} />
        </Fact>
        <Fact label="Last Win">
          <GrandPrixLink grandPrix={raceWins?.lastWin} showRaceName={true} />
        </Fact>
      </div>

      <div className={styles.facts}>
        <Fact label="Pole positions">
          <span>{polePositions?.totalNum ?? "0"}</span>
        </Fact>
        <Fact label="Race Wins">
          <span>{raceWins?.totalNum ?? "0"}</span>
        </Fact>
        <Fact label="Podiums">
          <span>{racesEntered?.numPodiums ?? "0"}</span>
        </Fact>
        <Fact label="Fastest Laps">
          <span>{numFastestLaps ?? "0"}</span>
        </Fact>
        <Fact label="World Championships">
          <span>{championshipResults?.numChampionshipsWon ?? "0"}</span>
        </Fact>

        {championshipResults &&
          championshipResults.numChampionshipsWon > 0 &&
          championshipResults.winningYears.map((championship) => {
            return (
              <SeasonLink
                key={championship.season}
                season={championship.season}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DriverProfileFacts;
