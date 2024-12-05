"use server";

import { MAX_LIMIT } from "../../../data/CONSTANTS";
import { GrandPrixWeekend } from "../../types/GrandPrix";

// NOTE: When the seasonID "current" is used, the data may have incorrect dates
export async function getSeasonSchedule(config: { seasonID: string }): Promise<GrandPrixWeekend[]> {
  const API_URL = `https://ergast.com/api/f1/${config.seasonID}.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races;
}
