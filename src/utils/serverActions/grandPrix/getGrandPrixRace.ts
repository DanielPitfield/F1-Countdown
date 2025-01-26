"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { Race } from "../../types/GrandPrix";

export async function getGrandPrixRace(config: { season: string; roundNumber: string }): Promise<Race> {
  const API_URL = `${BASE_API_URL}/${config.season}/${config.roundNumber}/results.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.RaceTable?.Races?.[0];
}
