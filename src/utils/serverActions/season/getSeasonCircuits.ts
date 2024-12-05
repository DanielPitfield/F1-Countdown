"use server";

import { MAX_LIMIT } from "../../../data/CONSTANTS";
import { Circuit } from "../../types/Circuit";

export async function getSeasonCircuits(config: { seasonID: string }): Promise<Circuit[]> {
  const API_URL = `https://ergast.com/api/f1/${config.seasonID}/circuits.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.CircuitTable.Circuits;
}
