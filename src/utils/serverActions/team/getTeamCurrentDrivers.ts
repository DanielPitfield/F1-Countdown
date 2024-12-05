"use server";

import { Driver } from "../../types/Driver";

export async function getTeamCurrentDrivers(config: { teamID: string }): Promise<Driver[]> {
  const API_URL = `http://ergast.com/api/f1/current/constructors/${config.teamID}/drivers.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.DriverTable.Drivers;
}
