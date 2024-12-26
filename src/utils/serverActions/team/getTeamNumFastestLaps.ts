"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";

export async function getTeamNumFastestLaps(config: { teamID: string }): Promise<number> {
  const API_URL = `${BASE_API_URL}/constructors/${config.teamID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return parseInt(data?.MRData?.total ?? "0");
}
