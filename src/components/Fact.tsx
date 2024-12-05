import styles from "../styles/Fact.module.scss";

import { CSSProperties } from "react";

interface FactProps {
  label: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

const Fact = (props: FactProps) => {
  return (
    <div style={props.style} className={styles.wrapper}>
      <strong className={styles.label}>{props.label}</strong>
      <div className={styles.value}>{props.children}</div>
    </div>
  );
};

export default Fact;
