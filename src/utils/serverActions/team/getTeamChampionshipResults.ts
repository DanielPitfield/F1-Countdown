"use server";

import { MAX_LIMIT } from "../../../data/CONSTANTS";
import { TeamSeasonResult, TeamSeasonResultResponse } from "../../types/Team";

export async function getTeamChampionshipResults(config: { teamID: string }): Promise<{
  numChampionshipsWon: number;
  numChampionshipsEntered: number;
  winningYears: TeamSeasonResult[];
  allYears: TeamSeasonResult[];
}> {
  const API_URL = `https://ergast.com/api/f1/constructors/${config.teamID}/constructorStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // The team's position in the team standings - for each year of their career
  const allYears: TeamSeasonResult[] = data.MRData.StandingsTable.StandingsLists.map((x: TeamSeasonResultResponse) => {
    return {
      season: x.season,
      round: x.round,
      teamStanding: x.ConstructorStandings[0],
    };
  });

  const winningYears: TeamSeasonResult[] = allYears.filter((year) => year.teamStanding.position === "1");

  return {
    numChampionshipsWon: winningYears.length,
    numChampionshipsEntered: parseInt(data.MRData.total),
    winningYears: winningYears,
    allYears: allYears,
  };
}
