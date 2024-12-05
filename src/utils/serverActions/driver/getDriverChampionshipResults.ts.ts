"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import { getCurrentYear } from "../../getCurrentYear";
import { getTotalNumChampionshipPoints } from "../../getTotalNumChampionshipPoints";
import type { DriverSeasonResult, DriverSeasonResultResponse } from "../../types/Driver";

export async function getDriverChampionshipResults(config: { driverID: string }): Promise<{
  numChampionshipsWon: number;
  numChampionshipsEntered: number;
  numCareerPoints: number;
  winningYears: DriverSeasonResult[];
  allYears: DriverSeasonResult[];
}> {
  /*
    TODO: Driver Championship result history

    With the old Ergast API, all of the driver's season results could be determined with one request
    But now with Jolpica F1 API, the request must specify a season year!

    https://github.com/jolpica/jolpica-f1/blob/main/docs/ergast_differences.md#standings
    https://github.com/jolpica/jolpica-f1/issues/29
  */
  const API_URL = `${BASE_API_URL}/${getCurrentYear()}/drivers/${
    config.driverID
  }/driverStandings.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // The driver's position in the driver standings - for each year of their career
  const allYears: DriverSeasonResult[] = data.MRData.StandingsTable.StandingsLists.map(
    (x: DriverSeasonResultResponse) => {
      return {
        season: x.season,
        round: x.round,
        driverStanding: x.DriverStandings[0],
      };
    }
  );

  const winningYears: DriverSeasonResult[] = allYears.filter((year) => year.driverStanding.position === "1");

  return {
    numChampionshipsWon: winningYears.length,
    numChampionshipsEntered: parseInt(data.MRData.total),
    numCareerPoints: getTotalNumChampionshipPoints(allYears),
    winningYears: winningYears,
    allYears: allYears,
  };
}
