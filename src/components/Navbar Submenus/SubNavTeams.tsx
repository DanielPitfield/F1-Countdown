import styles from "../../styles/SubNav.module.scss";

import { trpc } from "../../utils/trpc";
import TeamLink from "../Links/TeamLink";

const SubNavTeams = () => {
  const { data: currentTeams } = trpc.home.getCurrentTeams.useQuery();

  if (!currentTeams) {
    return null;
  }

  return (
    <ul className={styles.menu}>
      {currentTeams.map((team) => {
        return (
          <li key={team.constructorId} className={styles.item}>
            <TeamLink team={team} />
          </li>
        );
      })}
    </ul>
  );
};

export default SubNavTeams;
