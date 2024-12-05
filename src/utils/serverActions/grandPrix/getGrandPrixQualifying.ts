"use server";

import { MAX_LIMIT } from "../../../data/limits";
import { Qualifying } from "../../types/GrandPrix";

export async function getGrandPrixQualifying(config: { season: string; roundNumber: string }): Promise<Qualifying> {
  const API_URL = `https://ergast.com/api/f1/${config.season}/${config.roundNumber}/qualifying.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races[0];
}
