import Link from "next/link";
import { Circuit } from "../../server/trpc/router/circuit";

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
