import styles from "../../../styles/DriverProfile.module.scss";

import { intervalToDuration } from "date-fns";
import { getDriverName } from "../../../utils/getDriverName";
import { getDriverDescription } from "../../../utils/serverActions/driver/getDriverDescription";

interface DriverProfileHeaderProps {
  driverID: string;
}

export default async function DriverProfileHeader(props: DriverProfileHeaderProps) {
  const description = await getDriverDescription({ driverID: props.driverID });
  const dateOfBirth = description?.dateOfBirth ? new Date(description.dateOfBirth) : new Date();

  const formattedDateOfBirth = dateOfBirth.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const age =
    intervalToDuration({
      start: dateOfBirth,
      end: new Date(),
    }).years ?? 0;

  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{getDriverName(description)}</h1>
      <h3 className={styles.subtitle}>{description?.nationality}</h3>
      <div>{`${formattedDateOfBirth} (Age: ${age})`}</div>
    </div>
  );
}
