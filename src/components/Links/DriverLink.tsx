import Link from "next/link";
import { Driver } from "../../server/trpc/router/driver";
import { getDriverName } from "../../utils/getDriverName";

interface DriverLinkProps {
  driver: Driver | undefined;
}

const DriverLink = (props: DriverLinkProps) => {
  if (!props.driver) {
    return null;
  }

  return (
    <Link
      href={`/driverProfiles/${props.driver.driverId}`}
      data-is-driver={true}
    >
      {getDriverName(props.driver)}
    </Link>
  );
};

export default DriverLink;
