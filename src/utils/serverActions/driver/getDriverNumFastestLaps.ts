"use server";

import { MAX_LIMIT } from "../../../data/limits";

export async function getDriverNumFastestLaps(config: { driverID: string }): Promise<number> {
  const API_URL = `http://ergast.com/api/f1/drivers/${config.driverID}/fastest/1/results.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return parseInt(data.MRData.total);
}
