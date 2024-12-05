import styles from "../../styles/DriverProfile.module.scss";

import Image from "next/image";
import DriverProfileHeader from "../../../components/Profiles/Driver/DriverProfileHeader";
import DriverProfileFacts from "../../../components/Profiles/Driver/DriverProfileFacts";
import { getDriverChampionshipResults } from "../../../utils/serverActions/driver/getDriverChampionshipResults.ts";

interface PageProps {
  params: {
    driverID: string;
  };
}

export default async function Page(props: PageProps) {
  const driverID = props.params.driverID;

  const championshipResults = await getDriverChampionshipResults({
    driverID,
  });

  return (
    <div className={styles.wrapper}>
      <DriverProfileHeader driverID={driverID} />

      <div className={styles.innerWrapper}>
        <Image src={`/Images/drivers/${driverID}.jpg`} alt={driverID} priority height={640} width={640} />
        <DriverProfileFacts driverID={driverID} championshipResults={championshipResults} />
      </div>
    </div>
  );
}
