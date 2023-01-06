import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import TwitterProfileTimeline from "../components/TwitterProfileTimeline";

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

            <TwitterProfileTimeline profileName="F1" isDarkMode />

            <h3>Statistics</h3>
            <Link href="/statistics/CurrentStandings">Current Standings</Link>
            <Link href="/statistics/DriverWorldChampionship">
              Driver Championships
            </Link>
            <Link href="/statistics/TeamWorldChampionship">
              Constructor Championships
            </Link>
            <Link href="/statistics/RaceWins">Race Wins</Link>

            <h3>Circuit Profiles</h3>
            <Link href="/circuitProfiles/monza">Monza</Link>
            <Link href="/circuitProfiles/spa">Spa</Link>
            <Link href="/circuitProfiles/baku">Baku</Link>

            <h3>Grand Prix Profiles</h3>
            <Link href="/grandPrixProfiles/2022/3">2022/3</Link>
            <Link href="/grandPrixProfiles/2022/4">2022/4</Link>

            <h3>Season Profiles</h3>
            <Link href="/seasonProfiles/2021">2021</Link>
            <Link href="/seasonProfiles/2022">2022</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
