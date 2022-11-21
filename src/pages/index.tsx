import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/index.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>F1 Dashboard</title>
        <meta
          name="description"
          content="F1 Statistics, Schedule and Information"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.containerOuter}>
          <div className={styles.containerInner}>
            <h1 className={styles.title}>
              <span className={styles.titlePink}>F1 Dashboard</span>
            </h1>

            <h3>Statistics</h3>
            <Link href="/statistics/DriverWorldChampionship">
              Driver Championships
            </Link>
            <Link href="/statistics/TeamWorldChampionship">
              Constructor Championships
            </Link>
            <Link href="/statistics/RaceWins">Race Wins</Link>

            <h3>Driver Profiles</h3>
            <Link href="/driverProfiles/alonso">Alonso</Link>
            <Link href="/driverProfiles/max_verstappen">Verstappen</Link>
            <Link href="/driverProfiles/leclerc">Leclerc</Link>

            <h3>Team Profiles</h3>
            <Link href="/teamProfiles/ferrari">Ferrari</Link>
            <Link href="/teamProfiles/red_bull">Red Bull</Link>
            <Link href="/teamProfiles/mercedes">Mercedes</Link>

            <h3>Other</h3>
            <Link href="/GuessingGame">Guessing Game</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
