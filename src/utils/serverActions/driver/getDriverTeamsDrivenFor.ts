"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { Team } from "../../types/Team";

export async function getDriverTeamsDrivenFor(config: { driverID: string }): Promise<Team[]> {
  const API_URL = `${BASE_API_URL}/drivers/${config.driverID}/constructors.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.ConstructorTable?.Constructors ?? [];
}
