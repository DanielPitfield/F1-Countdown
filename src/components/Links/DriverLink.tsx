import Link from "next/link";
import type { Driver } from "../../utils/types/Driver";
import { getDriverName } from "../../utils/getDriverName";
import { CSSProperties } from "react";

interface DriverLinkProps {
  driver: Driver | undefined;
  style?: CSSProperties;
}

const DriverLink = (props: DriverLinkProps) => {
  if (!props.driver) {
    return null;
  }

  return (
    <Link style={props.style} href={`/drivers/${props.driver.driverId}`} data-is-driver={true}>
      {getDriverName(props.driver)}
    </Link>
  );
};

export default DriverLink;
