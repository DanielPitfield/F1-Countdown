import { trpc } from "../../utils/trpc";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import DriverStandings from "../../../components/DriverStandings";
import TeamStandings from "../../../components/TeamStandings";
import SeasonSchedule from "../../../components/SeasonSchedule";

import styles from "../../styles/Profile.module.scss";

export async function getServerSideProps(context: GetServerSidePropsContext<{ season: string }>) {
  // The dynamic parameter of the route
  const season = context.params?.season as string;

  return {
    props: {
      season,
    },
  };
}

const SeasonProfile = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: schedule } = trpc.season.getSchedule.useQuery({
    seasonID: props.season,
  });

  const { data: driverStandings } = trpc.season.getDriverStandings.useQuery({
    seasonID: props.season,
  });

  const { data: teamStandings } = trpc.season.getTeamStandings.useQuery({
    seasonID: props.season,
  });

  return (
    <div className={styles.wrapper}>
      <SeasonSchedule schedule={schedule} showDates={true} />
      <DriverStandings standings={driverStandings} />
      <TeamStandings standings={teamStandings} />
    </div>
  );
};

export default SeasonProfile;
