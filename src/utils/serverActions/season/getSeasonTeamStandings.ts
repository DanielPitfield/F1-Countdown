"use server";

import { MAX_LIMIT } from "../../../data/limits";
import { TeamStanding } from "../../types/Statistics";

export async function getSeasonTeamStandings(config: { seasonID: string }): Promise<TeamStanding[]> {
  const API_URL = `http://ergast.com/api/f1/${config.seasonID}/constructorStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
