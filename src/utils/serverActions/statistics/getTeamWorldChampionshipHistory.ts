"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import { getCurrentYear } from "../../getCurrentYear";
import type { TeamSeasonResult, TeamSeasonResultResponse } from "../../types/Team";

// The historical information of every constructor that has won the Constructor's World Championship (since 1958)
export async function getTeamWorldChampionshipHistory(): Promise<TeamSeasonResult[]> {
  /*
    TODO: Team Championship result history
    
    With the old Ergast API, all of the driver's season results could be determined with one request
    But now with Jolpica F1 API, the request must specify a season year!

    https://github.com/jolpica/jolpica-f1/blob/main/docs/ergast_differences.md#standings
    https://github.com/jolpica/jolpica-f1/issues/29
  */
  const API_URL = `${BASE_API_URL}/${getCurrentYear()}/constructorStandings/1.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // The driver's position in the driver standings - for each year they won the world championship
  return data.MRData.StandingsTable.StandingsLists.map((x: TeamSeasonResultResponse) => {
    return {
      season: x.season,
      round: x.round,
      teamStanding: x.ConstructorStandings[0],
    };
  });
}
