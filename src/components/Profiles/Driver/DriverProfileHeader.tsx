import styles from "../../../styles/DriverProfile.module.scss";

import { intervalToDuration } from "date-fns";
import { getDriverName } from "../../../utils/getDriverName";
import { getDriverDescription } from "../../../utils/serverActions/driver/getDriverDescription";

interface DriverProfileHeaderProps {
  driverID: string;
}

export default async function DriverProfileHeader(props: DriverProfileHeaderProps) {
  const description = await getDriverDescription({ driverID: props.driverID });

  const age =
    intervalToDuration({
      start: description?.dateOfBirth ? new Date(description?.dateOfBirth) : new Date(),
      end: new Date(),
    }).years ?? 0;

  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{getDriverName(description)}</h1>{" "}
      <h3 className={styles.subtitle}>{description?.nationality}</h3>
      <div>{`${description?.dateOfBirth} (${age} years)`}</div>
    </div>
  );
}
