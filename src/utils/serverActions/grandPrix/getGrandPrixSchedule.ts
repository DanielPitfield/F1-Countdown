"use server";

import { BASE_API_URL } from "../../../data/CONSTANTS";
import type { GrandPrixWeekend } from "../../types/GrandPrix";

export async function getGrandPrixSchedule(config: { season: string; roundNumber: string }): Promise<GrandPrixWeekend> {
  const API_URL = `${BASE_API_URL}/${config.season}/${config.roundNumber}.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.RaceTable?.Races?.[0];
}
