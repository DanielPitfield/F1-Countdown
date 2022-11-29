import { trpc } from "../../../utils/trpc";

import styles from "../../../styles/TeamProfile.module.scss";

interface TeamProfileDescriptionProps {
  teamID: string;
}

const TeamProfileDescription = (props: TeamProfileDescriptionProps) => {
  const { data: description } = trpc.team.getInfo.useQuery({
    teamID: props.teamID,
  });

  const { data: isActive } = trpc.team.isActive.useQuery({
    teamID: props.teamID,
  });

  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{description?.name}</h1>
      <h3 className={styles.subtitle}>{description?.nationality}</h3>
      <div className={styles.activeStatus} data-isActive={isActive}>
        {isActive ? "Active" : "Not Active"}
      </div>
    </div>
  );
};

export default TeamProfileDescription;
