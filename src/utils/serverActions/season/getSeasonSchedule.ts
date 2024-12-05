"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { GrandPrixWeekend } from "../../types/GrandPrix";

// NOTE: When the seasonID "current" is used, the data may have incorrect dates
export async function getSeasonSchedule(config: { seasonID: string }): Promise<GrandPrixWeekend[]> {
  const API_URL = `${BASE_API_URL}/${config.seasonID}.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races;
}
