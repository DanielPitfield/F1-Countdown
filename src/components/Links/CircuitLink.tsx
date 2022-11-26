import Link from "next/link";
import { Circuit } from "../../server/trpc/router/circuit";

interface CircuitLinkProps {
  circuit: Circuit;
}

const CircuitLink = (props: CircuitLinkProps) => {
  return (
    <Link href={`/circuitProfiles/${props.circuit.circuitId}`}>
      {props.circuit.circuitName}
    </Link>
  );
};

export default CircuitLink;
