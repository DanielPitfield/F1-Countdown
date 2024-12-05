"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { DriverSeasonResult, DriverSeasonResultResponse } from "../../types/Driver";

// The historical information of every driver that has won the Driver's World Championship (since 1950)
export async function getDriverWorldChampionshipHistory(): Promise<DriverSeasonResult[]> {
  const API_URL = `${BASE_API_URL}/driverStandings/1.json?limit=${MAX_LIMIT}`;

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
