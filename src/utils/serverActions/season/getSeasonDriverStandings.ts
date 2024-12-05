"use server";

import { MAX_LIMIT } from "../../../data/limits";
import { DriverStanding } from "../../types/Statistics";

export async function getSeasonDriverStandings(config: { seasonID: string }): Promise<DriverStanding[]> {
  const API_URL = `http://ergast.com/api/f1/${config.seasonID}/driverStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}
