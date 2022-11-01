import intervalToDuration from "date-fns/intervalToDuration";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import styles from "../../styles/driverProfile.module.scss";

const DriverProfile = () => {
  const router = useRouter();

  const [driverName, setDriverName] = useState<string>("");

  React.useEffect(() => {
    if (router.isReady) {
      const { driverParam } = router.query;

      if (!driverParam) {
        return;
      }

      setDriverName(driverParam as string);
    }
  }, [router.isReady, router.query]);

  // TODO: Ideally this would be state, but this is a hook which can't be called conditionally or within an useEffect()
  const { data: generalInformation } = trpc.driver.getInfo.useQuery({
    driverID: driverName,
  });

  const { data: teamsDrivenFor } = trpc.driver.getTeamsDrivenFor.useQuery({
    driverID: driverName,
  });

  const { data: polePositions } = trpc.driver.getPolePositions.useQuery({
    driverID: driverName,
    isReturnOnlyTotalNum: true,
  });

  const { data: raceWins } = trpc.driver.getRaceWins.useQuery({
    driverID: driverName,
    isReturnOnlyTotalNum: true,
  });

  const { data: fastestLaps } = trpc.driver.getFastestLaps.useQuery({
    driverID: driverName,
    isReturnOnlyTotalNum: true,
  });

  const { data: worldChampionships } =
    trpc.driver.getWorldChampionshipWinningYears.useQuery({
      driverID: driverName,
    });

  const getAge = (): number => {
    return (
      intervalToDuration({
        start: generalInformation?.dateOfBirth
          ? new Date(generalInformation.dateOfBirth)
          : new Date(),
        end: new Date(),
      }).years ?? 0
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{`${generalInformation?.givenName} ${generalInformation?.familyName}`}</span>
        <span>{generalInformation?.dateOfBirth}</span>
        <span>{getAge()}</span>
        <span>{generalInformation?.nationality}</span>
      </div>

      <span className={styles.teamsDrivenFor}>
        {teamsDrivenFor?.map((constructor) => constructor.name).join(", ")}
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

export default DriverProfile;
