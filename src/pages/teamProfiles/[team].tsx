import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import styles from "../../styles/teamProfile.module.scss";

const TeamProfile = () => {
  const router = useRouter();

  const [teamName, setTeamName] = useState<string>("");

  React.useEffect(() => {
    if (router.isReady) {
      const { team: teamParam } = router.query;

      if (!teamParam) {
        return;
      }

      setTeamName(teamParam as string);
    }
  }, [router.isReady, router.query]);

  // TODO: Ideally this would be state, but this is a hook which can't be called conditionally or within an useEffect()
  const { data: generalInformation } = trpc.team.getInfo.useQuery({
    teamID: teamName,
  });

  const { data: currentDrivers } = trpc.team.getDrivers.useQuery({
    teamID: teamName,
    isReturnOnlyCurrentDrivers: true,
  });

  const { data: polePositions } = trpc.team.getPolePositions.useQuery({
    teamID: teamName,
    isReturnOnlyTotalNum: true,
  });

  const { data: raceWins } = trpc.team.getRaceWins.useQuery({
    teamID: teamName,
    isReturnOnlyTotalNum: true,
  });

  const { data: fastestLaps } = trpc.team.getFastestLaps.useQuery({
    teamID: teamName,
    isReturnOnlyTotalNum: true,
  });

  const { data: worldChampionships } =
    trpc.team.getWorldChampionshipWinningYears.useQuery({
      teamID: teamName,
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{generalInformation?.name}</span>
        <span>{generalInformation?.nationality}</span>
      </div>

      <span className={styles.currentDrivers}>
        {currentDrivers?.map(driver => `${driver.givenName} ${driver.familyName}`).join(", ")}
      </span>

      <div className={styles.resultsInformation}>
        <span>{`Pole positions: ${polePositions}`}</span>
        <span>{`Race wins: ${raceWins}`}</span>
        <span>{`Fastest Laps: ${fastestLaps}`}</span>
        <span>{`World championships: ${worldChampionships?.length}`}</span>
      </div>
    </div>
  );
};

export default TeamProfile;
