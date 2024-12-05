"use server";

import { MAX_LIMIT } from "../../../data/limits";
import { TeamStanding } from "../../types/Statistics";

export async function getTeamStandingsAfter(config: { season: string; roundNumber: string }): Promise<TeamStanding[]> {
  const API_URL = `https://ergast.com/api/f1/${config.season}/${config.roundNumber}/constructorStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
