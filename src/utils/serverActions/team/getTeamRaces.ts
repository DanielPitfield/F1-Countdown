"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import { filterPodiums } from "../../filterPodiums";
import type { Race } from "../../types/GrandPrix";

export async function getTeamRaces(config: { teamID: string }): Promise<{
  numRacesEntered: number;
  numPodiums: number;
  numWins: number;
  firstRace: Race | undefined;
  lastRace: Race | undefined;
  firstWin: Race | undefined;
  lastWin: Race | undefined;
}> {
  const API_URL = `${BASE_API_URL}/constructors/${config.teamID}/results.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  // Every race the team has participated in
  const allRaces: Race[] = data.MRData.RaceTable.Races;

  const winningRaces: Race[] = allRaces.filter((race) => {
    // What is the team of the driver that won the race?
    const winningTeam = race.Results.find((result) => result.position === "1")?.Constructor;

    // Is that the team in question?
    return winningTeam?.constructorId === config.teamID;
  });

  return {
    numRacesEntered: parseInt(data.MRData.total),
    numPodiums: filterPodiums(allRaces).length,
    numWins: winningRaces.length,
    firstRace: allRaces[0],
    lastRace: allRaces.at(-1),
    firstWin: winningRaces[0],
    lastWin: winningRaces.at(-1),
  };
}
