"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { TeamStanding } from "../../types/Statistics";

export async function getSeasonTeamStandings(config: { seasonID: string }): Promise<TeamStanding[]> {
  const API_URL = `${BASE_API_URL}/${config.seasonID}/constructorStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
