import Link from "next/link";
import type { Circuit } from "../../utils/types/Circuit";

interface CircuitLinkProps {
  circuit: Circuit | undefined;
}

const CircuitLink = (props: CircuitLinkProps) => {
  if (!props.circuit) {
    return null;
  }

  return <Link href={`/circuitProfiles/${props.circuit.circuitId}`}>{props.circuit.circuitName}</Link>;
};

export default CircuitLink;
