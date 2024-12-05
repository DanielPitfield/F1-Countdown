"use server";

import { MAX_LIMIT } from "../../../data/CONSTANTS";
import { Driver } from "../../types/Driver";

export async function getTeamAllDrivers(config: { teamID: string }): Promise<Driver[]> {
  const API_URL = `http://ergast.com/api/f1/constructors/${config.teamID}/drivers.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.DriverTable.Drivers;
}
