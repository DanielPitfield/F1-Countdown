"use server";

import { MAX_LIMIT } from "../../../data/limits";
import { DriverStanding } from "../../types/Statistics";

export async function getDriverStandingsAfter(config: {
  season: string;
  roundNumber: string;
}): Promise<DriverStanding[]> {
  const API_URL = `https://ergast.com/api/f1/${config.season}/${config.roundNumber}/driverStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}
