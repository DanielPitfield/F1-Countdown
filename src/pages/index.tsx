import type { NextPage } from "next";
import Head from "next/head";
import UpcomingWeekendSummary from "../components/UpcomingWeekendSummary";
import Image from "next/image";
import BannerImage from "../../public/Images/Banner.png";

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

      <section className={styles.wrapper}>
        <aside className={styles.navigation}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>F1 Dashboard</h1>
            <p className={styles.description}>Everything about F1!</p>
            <UpcomingWeekendSummary />
          </div>
        </aside>

        <div className={styles.imageWrapper}>
          <Image src={BannerImage} alt="Banner" priority fill />
        </div>
      </section>
    </>
  );
};

export default Home;
