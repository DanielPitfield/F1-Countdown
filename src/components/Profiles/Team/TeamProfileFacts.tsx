import styles from "../../../styles/TeamProfile.module.scss";

import SeasonLink from "../../Links/SeasonLink";
import GrandPrixLink from "../../Links/GrandPrixLink";
import Fact from "../../Fact";

import { getTeamChampionshipResults } from "../../../utils/serverActions/team/getTeamChampionshipResults";
import { getTeamRaces } from "../../../utils/serverActions/team/getTeamRaces";
import { getTeamPolePositions } from "../../../utils/serverActions/team/getTeamPolePositions";
import { getTeamNumFastestLaps } from "../../../utils/serverActions/team/getTeamNumFastestLaps";

interface TeamProfileFactsProps {
  teamID: string;
}

export default async function TeamProfileFacts(props: TeamProfileFactsProps) {
  const [championshipResults, races, polePositions, numFastestLaps] = await Promise.all([
    getTeamChampionshipResults({ teamID: props.teamID }),
    getTeamRaces({ teamID: props.teamID }),
    getTeamPolePositions({ teamID: props.teamID }),
    getTeamNumFastestLaps({ teamID: props.teamID }),
  ]);

  return (
    <div>
      <div className={styles.factsGroup}>
        <Fact label="Fastest Laps">
          <span>{numFastestLaps ?? "0"}</span>
        </Fact>

        <Fact label="Pole positions">
          <span>{polePositions?.totalNum ?? "0"}</span>
        </Fact>

        <Fact label="Podiums">
          <span>{races?.numPodiums ?? "0"}</span>
        </Fact>

        <Fact label="Race Wins">
          <span>{races?.numWins ?? "0"}</span>
        </Fact>

        <Fact label="World Championships">
          <span>{championshipResults?.numChampionshipsWon ?? "0"}</span>

          <span>
            {championshipResults?.winningYears.map((championship) => {
              return <SeasonLink key={championship.season} season={championship.season} />;
            })}
          </span>
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
        <Fact label="First Pole">
          <GrandPrixLink grandPrix={polePositions?.firstPole} showRaceName={true} />
        </Fact>

        <Fact label="Last Pole">
          <GrandPrixLink grandPrix={polePositions?.lastPole} showRaceName={true} />
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
    </div>
  );
}
