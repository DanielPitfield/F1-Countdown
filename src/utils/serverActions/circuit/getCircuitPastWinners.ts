"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { Race } from "../../types/GrandPrix";

export async function getCircuitPastWinners(config: { circuitID: string; numPastWinners: number }): Promise<{
  results: Race[];
  firstYear: Race;
  totalNum: number;
}> {
  const API_URL = `${BASE_API_URL}/circuits/${config.circuitID}/results/1.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return {
    results: (data?.MRData?.RaceTable?.Races ?? []).slice(-config.numPastWinners),
    firstYear: data?.MRData?.RaceTable?.Races?.[0],
    totalNum: parseInt(data?.MRData?.total ?? "0"),
  };
}
