import { trpc } from "../../../utils/trpc";

import styles from "../../styles/TeamProfile.module.scss";

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
      <span>{description?.name}</span>
      <span>{description?.nationality}</span>
      <div>{`Active: ${isActive}`}</div>
    </div>
  );
};

export default TeamProfileDescription;
