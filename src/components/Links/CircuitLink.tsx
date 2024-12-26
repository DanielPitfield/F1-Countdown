import Link from "next/link";
import type { Circuit } from "../../utils/types/Circuit";
import { CSSProperties } from "react";

interface CircuitLinkProps {
  circuit: Circuit | undefined;
  style?: CSSProperties;
}

const CircuitLink = (props: CircuitLinkProps) => {
  if (!props.circuit) {
    return null;
  }

  return (
    <Link style={props.style} href={`/circuits/${props.circuit.circuitId}`}>
      {props.circuit.circuitName}
    </Link>
  );
};

export default CircuitLink;
