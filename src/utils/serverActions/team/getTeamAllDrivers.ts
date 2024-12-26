"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { Driver } from "../../types/Driver";

export async function getTeamAllDrivers(config: { teamID: string }): Promise<Driver[]> {
  const API_URL = `${BASE_API_URL}/constructors/${config.teamID}/drivers.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.DriverTable?.Drivers ?? [];
}
