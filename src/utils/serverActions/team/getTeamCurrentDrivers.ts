"use server";

import { BASE_API_URL } from "../../../data/CONSTANTS";
import type { Driver } from "../../types/Driver";

export async function getTeamCurrentDrivers(config: { teamID: string }): Promise<Driver[]> {
  const API_URL = `${BASE_API_URL}/current/constructors/${config.teamID}/drivers.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.DriverTable.Drivers;
}
