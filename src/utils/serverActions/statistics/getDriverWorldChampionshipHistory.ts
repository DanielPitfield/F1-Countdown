"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import { getCurrentYear } from "../../getCurrentYear";
import type { DriverSeasonResult, DriverSeasonResultResponse } from "../../types/Driver";

// The historical information of every driver that has won the Driver's World Championship (since 1950)
export async function getDriverWorldChampionshipHistory(): Promise<DriverSeasonResult[]> {
  /*
    TODO: Driver Championship result history

    With the old Ergast API, all of the driver's season results could be determined with one request
    But now with Jolpica F1 API, the request must specify a season year!

    https://github.com/jolpica/jolpica-f1/blob/main/docs/ergast_differences.md#standings
    https://github.com/jolpica/jolpica-f1/issues/29
  */
  const API_URL = `${BASE_API_URL}/${getCurrentYear()}/driverStandings/1.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // The driver's position in the driver standings - for each year they won the world championship
  return data.MRData.StandingsTable.StandingsLists.map((x: DriverSeasonResultResponse) => {
    return {
      season: x.season,
      round: x.round,
      driverStanding: x.DriverStandings[0],
    };
  });
}
