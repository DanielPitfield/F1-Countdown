import Link from "next/link";
import { Driver } from "../../server/trpc/router/driver";
import { getDriverName } from "../../utils/getDriverName";

interface DriverLinkProps {
  driver: Driver;
}

const DriverLink = (props: DriverLinkProps) => {
  return (
    <Link href={`/driverProfiles/${props.driver.driverId}`}>
      {getDriverName(props.driver)}
    </Link>
  );
};

export default DriverLink;
