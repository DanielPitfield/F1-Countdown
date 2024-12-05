"use server";

import { Driver } from "../../types/Driver";

export async function getDriverDescription(config: { driverID: string }): Promise<Driver> {
  const API_URL = `http://ergast.com/api/f1/drivers/${config.driverID}.json?limit=1`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.DriverTable.Drivers[0];
}
