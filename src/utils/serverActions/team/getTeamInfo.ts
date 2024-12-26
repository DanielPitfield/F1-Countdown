"use server";

import { BASE_API_URL } from "../../../data/CONSTANTS";
import type { Team } from "../../types/Team";

export async function getTeamInfo(config: { teamID: string }): Promise<Team | undefined> {
  const API_URL = `${BASE_API_URL}/constructors/${config.teamID}.json?limit=1`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.ConstructorTable?.Constructors?.[0];
}
