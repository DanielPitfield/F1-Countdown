"use server";

import { BASE_API_URL } from "../../../data/CONSTANTS";
import type { Circuit } from "../../types/Circuit";

export async function getCircuitInfo(config: { circuitID: string }): Promise<Circuit> {
  const API_URL = `${BASE_API_URL}/circuits/${config.circuitID}.json?limit=1`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.CircuitTable?.Circuits?.[0];
}
