import styles from "../../styles/TeamProfile.module.scss";

import Image from "next/image";
import DriverLink from "../../../components/Links/DriverLink";
import TeamProfileHeader from "../../../components/Profiles/Team/TeamProfileHeader";
import TeamProfileFacts from "../../../components/Profiles/Team/TeamProfileFacts";
import { getTeamCurrentDrivers } from "../../../utils/serverActions/team/getTeamCurrentDrivers";
import { getTeamChampionshipResults } from "../../../utils/serverActions/team/getTeamChampionshipResults";

interface PageProps {
  params: {
    teamID: string;
  };
}

export default async function Page(props: PageProps) {
  const teamID = props.params.teamID;

  const [currentDrivers, championshipResults] = await Promise.all([
    getTeamCurrentDrivers({ teamID }),
    getTeamChampionshipResults({ teamID }),
  ]);

  return (
    <div className={styles.wrapper}>
      <TeamProfileHeader teamID={teamID} />

      <div className={styles.innerWrapper}>
        <Image src={`/Images/teams/${teamID}.jpg`} alt={teamID} height={640} width={640} />
        <TeamProfileFacts teamID={teamID} championshipResults={championshipResults} />
      </div>

      <div className={styles.currentDrivers}>
        <strong>Current Drivers</strong>

        {currentDrivers?.map((driver) => {
          return (
            <div key={driver.driverId}>
              <DriverLink driver={driver} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
