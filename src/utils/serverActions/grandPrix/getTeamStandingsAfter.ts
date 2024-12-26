"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { TeamStanding } from "../../types/Statistics";

export async function getTeamStandingsAfter(config: { season: string; roundNumber: string }): Promise<TeamStanding[]> {
  const API_URL = `${BASE_API_URL}/${config.season}/${config.roundNumber}/constructorStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.StandingsTable?.StandingsLists?.[0].ConstructorStandings ?? [];
}
