import Image from "next/image";
import DriverLink from "../../../components/Links/DriverLink";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import TeamProfileHeader from "../../../components/Profiles/Team/TeamProfileHeader";
import TeamProfileFacts from "../../../components/Profiles/Team/TeamProfileFacts";

import styles from "../../styles/TeamProfile.module.scss";

export async function getServerSideProps(context: GetServerSidePropsContext<{ team: string }>) {
  // The dynamic parameter of the route
  const team = context.params?.team as string;

  return {
    props: {
      team,
    },
  };
}

const TeamProfile = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: currentDrivers } = trpc.team.getCurrentDrivers.useQuery({
    teamID: props.team,
  });

  const { data: championshipResults } = trpc.team.getChampionshipResults.useQuery({
    teamID: props.team,
  });

  return (
    <div className={styles.wrapper}>
      <TeamProfileHeader teamID={props.team} />

      <div className={styles.innerWrapper}>
        <Image src={`/Images/teams/${props.team}.jpg`} alt={props.team} height={640} width={640} />
        <TeamProfileFacts teamID={props.team} championshipResults={championshipResults} />
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
};

export default TeamProfile;
