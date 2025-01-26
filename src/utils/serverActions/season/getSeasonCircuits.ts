"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { Circuit } from "../../types/Circuit";

export async function getSeasonCircuits(config: { seasonID: string }): Promise<Circuit[]> {
  const API_URL = `${BASE_API_URL}/${config.seasonID}/circuits.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.CircuitTable?.Circuits ?? [];
}
