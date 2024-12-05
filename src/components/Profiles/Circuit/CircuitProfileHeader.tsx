import styles from "../../../styles/CircuitProfile.module.scss";

import { getCircuitInfo } from "../../../utils/serverActions/circuit/getCircuitInfo";

interface CircuitProfileHeaderProps {
  circuitID: string;
}

export default async function CircuitProfileHeader(props: CircuitProfileHeaderProps) {
  const description = await getCircuitInfo({ circuitID: props.circuitID });

  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{description?.circuitName}</h1>
      <h3 className={styles.subtitle}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${description?.Location.lat},${description?.Location.long}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {description?.Location.locality},{description?.Location.country}
        </a>
      </h3>
    </div>
  );
}
