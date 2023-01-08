import styles from "../styles/Fact.module.scss";

interface FactProps {
  label: string;
  children: React.ReactNode;
}

const Fact = (props: FactProps) => {
  return (
    <div className={styles.wrapper}>
      <strong className={styles.label}>{props.label}</strong>
      <div className={styles.value}>{props.children}</div>
    </div>
  );
};

export default Fact;
