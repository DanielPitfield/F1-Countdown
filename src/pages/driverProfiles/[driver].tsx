import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import DriverProfileHeader from "../../components/Profiles/Driver/DriverProfileHeader";
import DriverProfileFacts from "../../components/Profiles/Driver/DriverProfileFacts";

import styles from "../../styles/DriverProfile.module.scss";

export async function getServerSideProps(context: GetServerSidePropsContext<{ driver: string }>) {
  // The dynamic parameter of the route
  const driver = context.params?.driver as string;

  return {
    props: {
      driver,
    },
  };
}

const DriverProfile = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: championshipResults } = trpc.driver.getChampionshipResults.useQuery({
    driverID: props.driver,
  });

  return (
    <div className={styles.wrapper}>
      <DriverProfileHeader driverID={props.driver} />

      <div className={styles.innerWrapper}>
        <Image src={`/Images/drivers/${props.driver}.jpg`} alt={props.driver} priority height={640} width={640} />
        <DriverProfileFacts driverID={props.driver} championshipResults={championshipResults} />
      </div>
    </div>
  );
};

export default DriverProfile;
