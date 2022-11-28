import { trpc } from "../../../utils/trpc";
import { getDriverName } from "../../../utils/getDriverName";
import intervalToDuration from "date-fns/intervalToDuration";

import styles from "../../../styles/DriverProfile.module.scss";

interface DriverProfileDescriptionProps {
  driverID: string;
}

const DriverProfileDescription = (props: DriverProfileDescriptionProps) => {
  const { data: description } = trpc.driver.getDescription.useQuery({
    driverID: props.driverID,
  });

  const { data: isActive } = trpc.driver.isActive.useQuery({
    driverID: props.driverID,
  });

  const age =
    intervalToDuration({
      start: description?.dateOfBirth
        ? new Date(description?.dateOfBirth)
        : new Date(),
      end: new Date(),
    }).years ?? 0;

  return (
    <div className={styles.description}>
      <span>{getDriverName(description)}</span>
      <span>{`${description?.dateOfBirth} (${age} years)`}</span>
      <span>{description?.nationality}</span>
      <div>{`Active: ${isActive}`}</div>
    </div>
  );
};

export default DriverProfileDescription;
