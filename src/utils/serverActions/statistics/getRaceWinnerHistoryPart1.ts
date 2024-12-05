"use server";

import { MAX_LIMIT } from "../../../data/limits";
import { Race } from "../../types/GrandPrix";

// The historical information of races won since 1950 (up to the max limit of 1000)
export async function getRaceWinnerHistoryPart1(): Promise<Race[]> {
  const API_URL = `https://ergast.com/api/f1/results/1.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races;
}
