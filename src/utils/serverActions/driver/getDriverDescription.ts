"use server";

import { BASE_API_URL } from "../../../data/CONSTANTS";
import type { Driver } from "../../types/Driver";

export async function getDriverDescription(config: { driverID: string }): Promise<Driver | undefined> {
  const API_URL = `${BASE_API_URL}/drivers/${config.driverID}.json?limit=1`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data?.MRData?.DriverTable?.Drivers?.[0];
}
