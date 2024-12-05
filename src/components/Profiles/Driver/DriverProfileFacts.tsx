import styles from "../../../styles/DriverProfile.module.scss";

import SeasonLink from "../../Links/SeasonLink";
import GrandPrixLink from "../../Links/GrandPrixLink";
import TeamLink from "../../Links/TeamLink";
import Fact from "../../Fact";

import { getDriverChampionshipResults } from "../../../utils/serverActions/driver/getDriverChampionshipResults.ts";
import { getDriverRaces } from "../../../utils/serverActions/driver/getDriverRaces";
import { getDriverPolePositions } from "../../../utils/serverActions/driver/getDriverPolePositions";
import { getDriverNumFastestLaps } from "../../../utils/serverActions/driver/getDriverNumFastestLaps";
import { getDriverTeamsDrivenFor } from "../../../utils/serverActions/driver/getDriverTeamsDrivenFor";

interface DriverProfileFactsProps {
  driverID: string;
}

export default async function DriverProfileFacts(props: DriverProfileFactsProps) {
  const [championshipResults, races, polePositions, numFastestLaps, teamsDrivenFor] = await Promise.all([
    getDriverChampionshipResults({ driverID: props.driverID }),
    getDriverRaces({ driverID: props.driverID }),
    getDriverPolePositions({ driverID: props.driverID }),
    getDriverNumFastestLaps({ driverID: props.driverID }),
    getDriverTeamsDrivenFor({ driverID: props.driverID }),
  ]);

  return (
    <div>
      <div className={styles.factsGroup}>
        <Fact label="World Championships">
          <span className={styles.championshipsWon}>{championshipResults?.numChampionshipsWon ?? "0"}</span>

          <span>
            {championshipResults?.winningYears.map((championship, index) => [
              // Opening bracket before first year
              index === 0 && "(",
              // Seperate the season links with commas
              index > 0 && ", ",

              <SeasonLink key={championship.season} season={championship.season} />,

              // Closing bracket after last year
              index === (championshipResults?.winningYears.length ?? 0) - 1 && ")",
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
}
