"use server";

import { MAX_LIMIT } from "../../../data/CONSTANTS";

export async function getTeamNumFastestLaps(config: { teamID: string }): Promise<number> {
  const API_URL = `http://ergast.com/api/f1/constructors/${config.teamID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return parseInt(data.MRData.total);
}
