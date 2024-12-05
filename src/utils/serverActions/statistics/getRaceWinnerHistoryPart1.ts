"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { Race } from "../../types/GrandPrix";

// The historical information of races won since 1950 (up to the max limit of 1000)
export async function getRaceWinnerHistoryPart1(): Promise<Race[]> {
  const API_URL = `${BASE_API_URL}/results/1.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races;
}
