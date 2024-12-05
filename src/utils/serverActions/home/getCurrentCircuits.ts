"use server";

import { getCurrentYear } from "../../getCurrentYear";
import { Circuit } from "../../types/Circuit";
import { getSeasonCircuits } from "../season/getSeasonCircuits";

export async function getCurrentCircuits(): Promise<Circuit[]> {
  return (
    (await getSeasonCircuits({
      seasonID: getCurrentYear().toString(),
    })) ??
    (await getSeasonCircuits({
      seasonID: "current",
    }))
  );
}
