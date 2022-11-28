import { trpc } from "../../../utils/trpc";

import styles from "../../../styles/CircuitProfile.module.scss";

interface CircuitProfileDescriptionProps {
  circuitID: string;
}

const CircuitProfileDescription = (props: CircuitProfileDescriptionProps) => {
  const { data: description } = trpc.circuit.getInfo.useQuery({
    circuitID: props.circuitID,
  });

  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{description?.circuitName}</h1>
      <h3 className={styles.subtitle}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${description?.Location.lat},${description?.Location.long}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {description?.Location.locality},
          {description?.Location.country}
        </a>
      </h3>
    </div>
  );
};

export default CircuitProfileDescription;
