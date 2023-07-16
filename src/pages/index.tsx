import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import Image from "next/image";
import BannerImage from "../../public/Images/Banner.png";
import UpcomingWeekendSummary from "../components/UpcomingWeekendSummary";
import SocialMediaButton from "../components/SocialMediaButton";
import { SocialMediaNames } from "../data/SocialMedia";

import styles from "../styles/index.module.scss";

const Home: NextPage = () => {
  const { data: upcomingGrandPrixWeekend } = trpc.home.getUpcomingGrandPrixWeekend.useQuery();

  return (
    <>
      <Head>
        <title>F1 Dashboard</title>
        <meta name="description" content="F1 Statistics, Schedule and Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.wrapper}>
        <aside className={styles.navigation}>
          <div className={styles.titleWrapper}>
            <UpcomingWeekendSummary upcomingGrandPrixWeekend={upcomingGrandPrixWeekend} />
            {upcomingGrandPrixWeekend !== undefined && (
              <ul className={styles.list}>
                {SocialMediaNames.map((name) => (
                  <SocialMediaButton key={name} name={name} />
                ))}
              </ul>
            )}
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
