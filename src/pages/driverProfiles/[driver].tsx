import intervalToDuration from "date-fns/intervalToDuration";
import { trpc } from "../../utils/trpc";
import TeamLink from "../../components/Links/TeamLink";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import superjson from "superjson";
import { prisma } from "../../server/db/client";
import { REVALDATION_PERIOD } from "../../utils/limits";
import GrandPrixLink from "../../components/Links/GrandPrixLink";
import SeasonLink from "../../components/Links/SeasonLink";
import { Fact } from "../../components/Fact";

import styles from "../../styles/DriverProfile.module.scss";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO: Build time SSG
    paths: [
      { params: { driver: "max_verstappen" } },
      { params: { driver: "hamilton" } },
    ],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ driver: string }>
) {
  // Helper function
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });

  // The dynamic parameter of the route
  const driver = context.params?.driver as string;

  // Pre-fetching data (so that it is immediately available)
  const driverInfo = await ssg.driver.getInfo.fetch({ driverID: driver });
  await ssg.driver.isActive.prefetch({ driverID: driver });
  await ssg.driver.getTeamsDrivenFor.prefetch({ driverID: driver });
  await ssg.driver.getRacesEntered.prefetch({ driverID: driver });
  await ssg.driver.getPolePositions.prefetch({ driverID: driver });
  await ssg.driver.getRaceWins.prefetch({ driverID: driver });
  await ssg.driver.getNumFastestLaps.prefetch({ driverID: driver });
  await ssg.driver.getChampionshipResults.prefetch({ driverID: driver });

  // TODO: Is age statically generated?
  const age =
    intervalToDuration({
      start: driverInfo?.dateOfBirth
        ? new Date(driverInfo?.dateOfBirth)
        : new Date(),
      end: new Date(),
    }).years ?? 0;

  return {
    props: {
      trpcState: ssg.dehydrate(),
      driver,
      age,
    },
    revalidate: REVALDATION_PERIOD,
  };
}

const DriverProfile = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { driver } = props;

  const { data: generalInformation } = trpc.driver.getInfo.useQuery({
    driverID: driver,
  });

  const { data: isActive } = trpc.driver.isActive.useQuery({
    driverID: driver,
  });

  const { data: teamsDrivenFor } = trpc.driver.getTeamsDrivenFor.useQuery({
    driverID: driver,
  });

  const { data: racesEntered } = trpc.driver.getRacesEntered.useQuery({
    driverID: driver,
  });

  const { data: polePositions } = trpc.driver.getPolePositions.useQuery({
    driverID: driver,
  });

  const { data: raceWins } = trpc.driver.getRaceWins.useQuery({
    driverID: driver,
  });

  const { data: numFastestLaps } = trpc.driver.getNumFastestLaps.useQuery({
    driverID: driver,
  });

  const { data: championshipResults } =
    trpc.driver.getChampionshipResults.useQuery({ driverID: driver });

  return (
    <div className={styles.wrapper}>
      <div className={styles.generalInformation}>
        <span>{`${generalInformation?.givenName} ${generalInformation?.familyName}`}</span>
        <span>{`${generalInformation?.dateOfBirth} (${props.age} years)`}</span>
        <span>{generalInformation?.nationality}</span>
      </div>

      <div>{`Active: ${isActive}`}</div>

      <div className={styles.teamsDrivenFor}>
        <strong>Teams Driven For</strong>
        {teamsDrivenFor?.map((team) => {
          return (
            <div key={team.constructorId}>
              <TeamLink team={team} />
            </div>
          );
        })}
      </div>

      <div className={styles.facts}>
        <Fact label="First Race">
          <GrandPrixLink
            grandPrix={racesEntered?.firstRace}
            showRaceName={true}
          />
        </Fact>
        <Fact label="Last Race">
          <GrandPrixLink
            grandPrix={racesEntered?.lastRace}
            showRaceName={true}
          />
        </Fact>
        <Fact label="First Pole">
          <GrandPrixLink
            grandPrix={polePositions?.firstPole}
            showRaceName={true}
          />
        </Fact>
        <Fact label="Last Pole">
          <GrandPrixLink
            grandPrix={polePositions?.lastPole}
            showRaceName={true}
          />
        </Fact>
        <Fact label="First Win">
          <GrandPrixLink grandPrix={raceWins?.firstWin} showRaceName={true} />
        </Fact>
        <Fact label="Last Win">
          <GrandPrixLink grandPrix={raceWins?.lastWin} showRaceName={true} />
        </Fact>
      </div>

      <div className={styles.facts}>
        <Fact label="Pole positions">
          <span>{polePositions?.totalNum ?? "0"}</span>
        </Fact>
        <Fact label="Race Wins">
          <span>{raceWins?.totalNum ?? "0"}</span>
        </Fact>
        <Fact label="Podiums">
          <span>{racesEntered?.numPodiums ?? "0"}</span>
        </Fact>
        <Fact label="Fastest Laps">
          <span>{numFastestLaps ?? "0"}</span>
        </Fact>
        <Fact label="World Championships">
          <span>{championshipResults?.numChampionshipsWon ?? "0"}</span>
        </Fact>

        {championshipResults &&
          championshipResults.numChampionshipsWon > 0 &&
          championshipResults.winningYears.map((championship) => {
            return (
              <SeasonLink
                key={championship.season}
                season={championship.season}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DriverProfile;
