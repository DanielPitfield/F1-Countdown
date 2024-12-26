"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { DriverStanding } from "../../types/Statistics";

export async function getDriverStandingsAfter(config: {
  season: string;
  roundNumber: string;
}): Promise<DriverStanding[]> {
  const API_URL = `${BASE_API_URL}/${config.season}/${config.roundNumber}/driverStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.StandingsTable?.StandingsLists?.[0].DriverStandings ?? [];
}
