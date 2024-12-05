import styles from "../../styles/SubNav.module.scss";

import TeamLink from "../Links/TeamLink";
import type { Team } from "../../utils/types/Team";

interface SubNavTeamsProps {
  currentTeams: Team[];
}

export default function SubNavTeams(props: SubNavTeamsProps) {
  return (
    <ul className={styles.menu}>
      {props.currentTeams.map((team) => {
        return (
          <li key={team.constructorId} className={styles.item}>
            <TeamLink team={team} />
          </li>
        );
      })}
    </ul>
  );
}
