"use server";

import { BASE_API_URL } from "../../../data/CONSTANTS";
import { getCurrentYear } from "../../getCurrentYear";
import { getSeasonDriverStandings } from "../season/getSeasonDriverStandings";
import type { Driver } from "../../types/Driver";

export async function getCurrentDrivers(): Promise<Driver[]> {
  // Getting the drivers from the driver standings of the current year can provide more up-to-date information
  const drivers: Driver[] = (
    await getSeasonDriverStandings({
      seasonID: getCurrentYear().toString(),
    })
  ).map((standing) => standing.Driver);

  if (drivers) {
    return drivers;
  }

  // Otherwise, try getting the current drivers using "current" field within request URL
  const API_URL = `${BASE_API_URL}/current/drivers.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.DriverTable?.Drivers ?? [];
}
