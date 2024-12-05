"use server";

import { MAX_LIMIT } from "../../../data/CONSTANTS";
import { Race } from "../../types/GrandPrix";

// The remaining historical information of races won (after the max limit of 1000)
export async function getRaceWinnerHistoryPart2(): Promise<Race[]> {
  const API_URL = `https://ergast.com/api/f1/results/1.json?limit=${MAX_LIMIT}&offset=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races;
}
