import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import styles from "../styles/TwitterProfileTimeline.module.scss";

interface TwitterProfileTimelineProps {
  profileName: string;
  isDarkMode: boolean;
}

const TwitterProfileTimeline = (props: TwitterProfileTimelineProps) => {
  return (
    <div className={styles.wrapper}>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={props.profileName}
        noHeader
        noFooter
        noScrollbar
        theme={props.isDarkMode ? "dark" : "light"}
        placeholder={<em className={styles.placeholder}>Loading...</em>}
      />
    </div>
  );
};

export default TwitterProfileTimeline;
