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

            <Link href="/Statistics">Statistics</Link>

            <Link href="/driverProfiles/alonso">Alonso</Link>
            <Link href="/driverProfiles/max_verstappen">Verstappen</Link>
            <Link href="/driverProfiles/leclerc">Leclerc</Link>

            <Link href="/constructorProfiles/ferrari">Ferrari</Link>
            <Link href="/constructorProfiles/red_bull">Red Bull</Link>
            <Link href="/constructorProfiles/mercedes">Mercedes</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
