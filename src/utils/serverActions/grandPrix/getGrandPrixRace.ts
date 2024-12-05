"use server";

import { MAX_LIMIT } from "../../../data/limits";
import { Race } from "../../types/GrandPrix";

export async function getGrandPrixRace(config: { season: string; roundNumber: string }): Promise<Race> {
  const API_URL = `https://ergast.com/api/f1/${config.season}/${config.roundNumber}/results.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races[0];
}
