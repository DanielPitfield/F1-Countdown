import { AppRouterTypes, trpc } from "../../../utils/trpc";
import SeasonLink from "../../Links/SeasonLink";
import GrandPrixLink from "../../Links/GrandPrixLink";
import TeamLink from "../../Links/TeamLink";
import Fact from "../../Fact";

import styles from "../../../styles/DriverProfile.module.scss";

type championshipResultsOutput = AppRouterTypes["driver"]["getChampionshipResults"]["output"];

interface DriverProfileFactsProps {
  driverID: string;
  championshipResults: championshipResultsOutput | undefined;
}

const DriverProfileFacts = (props: DriverProfileFactsProps) => {
  const { data: races } = trpc.driver.getRaces.useQuery({
    driverID: props.driverID,
  });

  const { data: polePositions } = trpc.driver.getPolePositions.useQuery({
    driverID: props.driverID,
  });

  const { data: numFastestLaps } = trpc.driver.getNumFastestLaps.useQuery({
    driverID: props.driverID,
  });

  const { data: teamsDrivenFor } = trpc.driver.getTeamsDrivenFor.useQuery({
    driverID: props.driverID,
  });

  return (
    <div>
      <div className={styles.factsGroup}>
        <Fact label="World Championships">
          <span className={styles.championshipsWon}>{props.championshipResults?.numChampionshipsWon ?? "0"}</span>
          <span>
            {props.championshipResults?.winningYears.map((championship, index) => [
              // Opening bracket before first year
              index === 0 && "(",
              // Seperate the season links with commas
              index > 0 && ", ",

              <SeasonLink key={championship.season} season={championship.season} />,

              // Closing bracket after last year
              index === (props.championshipResults?.winningYears.length ?? 0) - 1 && ")",
            ])}
          </span>
        </Fact>
        <Fact label="Race Wins">
          <span>{races?.numWins ?? "0"}</span>
        </Fact>
      </div>

      <div className={styles.factsGroup}>
        <Fact label="Podiums">
          <span>{races?.numPodiums ?? "0"}</span>
        </Fact>
        <Fact label="Fastest Laps">
          <span>{numFastestLaps ?? "0"}</span>
        </Fact>
        <Fact label="Pole positions">
          <span>{polePositions?.totalNum ?? "0"}</span>
        </Fact>
      </div>

      <div className={styles.factsGroup}>
        <Fact label="First Race">
          <GrandPrixLink grandPrix={races?.firstRace} showRaceName={true} />
        </Fact>
        <Fact label="Last Race">
          <GrandPrixLink grandPrix={races?.lastRace} showRaceName={true} />
        </Fact>
      </div>

      <div className={styles.factsGroup}>
        <Fact label="First Win">
          <GrandPrixLink grandPrix={races?.firstWin} showRaceName={true} />
        </Fact>
        <Fact label="Last Win">
          <GrandPrixLink grandPrix={races?.lastWin} showRaceName={true} />
        </Fact>
      </div>

      <div className={styles.factsGroup}>
        <Fact label="First Pole">
          <GrandPrixLink grandPrix={polePositions?.firstPole} showRaceName={true} />
        </Fact>
        <Fact label="Last Pole">
          <GrandPrixLink grandPrix={polePositions?.lastPole} showRaceName={true} />
        </Fact>
      </div>

      <div className={styles.factsGroup}>
        <Fact label="Teams Driven for">
          {teamsDrivenFor?.map((team, index) => [
            // Seperate the team links with commas
            index > 0 && ", ",
            <TeamLink key={team.constructorId} team={team} />,
          ])}
        </Fact>
      </div>
    </div>
  );
};

export default DriverProfileFacts;
