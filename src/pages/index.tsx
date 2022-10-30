import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>F1 Dashboard</title>
        <meta name="description" content="F1 Statistics, Schedule and Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.containerOuter}>
          <div className={styles.containerInner}>
            <h1 className={styles.title}>
              <span className={styles.titlePink}>F1 Dashboard</span>
            </h1>

            <Link href="/Statistics">Statistics</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
