import styles from "../../../styles/TeamProfile.module.scss";

import { getTeamInfo } from "../../../utils/serverActions/team/getTeamInfo";

interface TeamProfileHeaderProps {
  teamID: string;
}

export default async function TeamProfileHeader(props: TeamProfileHeaderProps) {
  const description = await getTeamInfo({ teamID: props.teamID });

  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{description?.name}</h1>
      <h3 className={styles.subtitle}>{description?.nationality}</h3>
    </div>
  );
}
