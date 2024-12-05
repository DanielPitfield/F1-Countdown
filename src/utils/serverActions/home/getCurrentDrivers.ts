"use server";

import { getCurrentYear } from "../../getCurrentYear";
import { Driver } from "../../types/Driver";
import { getSeasonDriverStandings } from "../season/getSeasonDriverStandings";

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
  const API_URL = `http://ergast.com/api/f1/current/drivers.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.DriverTable.Drivers;
}
