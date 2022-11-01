import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import styles from "../../styles/constructorProfile.module.scss";

const ConstructorProfile = () => {
  const router = useRouter();

  const [constructorName, setConstructorName] = useState<string>("");

  React.useEffect(() => {
    if (router.isReady) {
      const { constructorParam } = router.query;

      if (!constructorParam) {
        return;
      }

      setConstructorName(constructorParam as string);
    }
  }, [router.isReady, router.query]);

  // TODO: Ideally this would be state, but this is a hook which can't be called conditionally or within an useEffect()
  const { data: generalInformation } = trpc.constructor.getInfo.useQuery({
    constructorID: constructorName,
  });

  const { data: currentDrivers } = trpc.constructor.getDrivers.useQuery({
    constructorID: constructorName,
    isReturnOnlyCurrentDrivers: true,
  });

  const { data: polePositions } = trpc.constructor.getPolePositions.useQuery({
    constructorID: constructorName,
    isReturnOnlyTotalNum: true,
  });

  const { data: raceWins } = trpc.constructor.getRaceWins.useQuery({
    constructorID: constructorName,
    isReturnOnlyTotalNum: true,
  });

  const { data: fastestLaps } = trpc.constructor.getFastestLaps.useQuery({
    constructorID: constructorName,
    isReturnOnlyTotalNum: true,
  });

  const { data: worldChampionships } =
    trpc.constructor.getWorldChampionshipWinningYears.useQuery({
      constructorID: constructorName,
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{generalInformation?.name}</span>
        <span>{generalInformation?.nationality}</span>
      </div>

      <span className={styles.currentDrivers}>
        {currentDrivers?.join(", ")}
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

export default ConstructorProfile;
