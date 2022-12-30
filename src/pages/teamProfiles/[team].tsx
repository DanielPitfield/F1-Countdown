import { trpc } from "../../utils/trpc";
import Image from "next/image";
import DriverLink from "../../components/Links/DriverLink";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import superjson from "superjson";
import { prisma } from "../../server/db/client";
import { REVALDATION_PERIOD } from "../../utils/limits";

import TeamProfileHeader from "../../components/Profiles/Team/TeamProfileHeader";
import TeamProfileFacts from "../../components/Profiles/Team/TeamProfileFacts";

import styles from "../../styles/TeamProfile.module.scss";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ team: string }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route
  const team = context.params?.team as string;

  // Pre-fetching data (so that it is immediately available)
  await ssg.team.getInfo.prefetch({ teamID: team });
  await ssg.team.getCurrentDrivers.prefetch({ teamID: team });
  await ssg.team.getPolePositions.prefetch({ teamID: team });
  await ssg.team.getRaces.prefetch({ teamID: team });
  await ssg.team.getNumFastestLaps.prefetch({ teamID: team });
  await ssg.team.getChampionshipResults.prefetch({ teamID: team });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      team,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const TeamProfile = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data: currentDrivers } = trpc.team.getCurrentDrivers.useQuery({
    teamID: props.team,
  });

  const { data: championshipResults } =
    trpc.team.getChampionshipResults.useQuery({
      teamID: props.team,
    });

  return (
    <div className={styles.wrapper}>
      <TeamProfileHeader
        teamID={props.team}
        isActive={championshipResults?.isActive}
      />

      <div className={styles.innerWrapper}>
        <Image
          src={`/images/teams/${props.team}.jpg`}
          alt={props.team}
          height={640}
          width={640}
        />
        <TeamProfileFacts
          teamID={props.team}
          championshipResults={championshipResults}
        />
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
