"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import { getCurrentYear } from "../../getCurrentYear";
import type { TeamSeasonResult, TeamSeasonResultResponse } from "../../types/Team";

export async function getTeamChampionshipResults(config: { teamID: string }): Promise<{
  numChampionshipsWon: number;
  numChampionshipsEntered: number;
  winningYears: TeamSeasonResult[];
  allYears: TeamSeasonResult[];
}> {
  /*
    TODO: Team Championship result history
    
    With the old Ergast API, all of the driver's season results could be determined with one request
    But now with Jolpica F1 API, the request must specify a season year!

    https://github.com/jolpica/jolpica-f1/blob/main/docs/ergast_differences.md#standings
    https://github.com/jolpica/jolpica-f1/issues/29
  */
  const API_URL = `${BASE_API_URL}/${getCurrentYear()}/constructors/${
    config.teamID
  }/constructorStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // The team's position in the team standings - for each year of their career
  const allYears: TeamSeasonResult[] = (data?.MRData?.StandingsTable?.StandingsLists ?? []).map((x: TeamSeasonResultResponse) => {
    return {
      season: x.season,
      round: x.round,
      teamStanding: x.ConstructorStandings[0],
    };
  });

  const winningYears: TeamSeasonResult[] = allYears.filter((year) => year.teamStanding.position === "1");

  return {
    numChampionshipsWon: winningYears.length,
    numChampionshipsEntered: parseInt(data?.MRData?.total ?? "0"),
    winningYears: winningYears,
    allYears: allYears,
  };
}
