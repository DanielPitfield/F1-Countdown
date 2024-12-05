import styles from "../../styles/SubNav.module.scss";

import TeamLink from "../Links/TeamLink";
import { getCurrentTeams } from "../../utils/serverActions/home/getCurrentTeams";

export default async function SubNavTeams() {
  const currentTeams = await getCurrentTeams();

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
}
