"use server";

import { MAX_LIMIT } from "../../../data/CONSTANTS";
import { TeamSeasonResult, TeamSeasonResultResponse } from "../../types/Team";

// The historical information of every constructor that has won the Constructor's World Championship (since 1958)
export async function getTeamWorldChampionshipHistory(): Promise<TeamSeasonResult[]> {
  const API_URL = `http://ergast.com/api/f1/constructorStandings/1.json?limit=${MAX_LIMIT}`;

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
