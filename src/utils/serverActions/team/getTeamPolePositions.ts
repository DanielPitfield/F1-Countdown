"use server";

import { BASE_API_URL, MAX_LIMIT } from "../../../data/CONSTANTS";
import type { Race } from "../../types/GrandPrix";

export async function getTeamPolePositions(config: { teamID: string }): Promise<{
  firstPole: Race;
  lastPole: Race;
  totalNum: number;
}> {
  const API_URL = `${BASE_API_URL}/constructors/${config.teamID}/qualifying/1.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  const poles = data?.MRData?.RaceTable?.Races ?? [];

  return {
    firstPole: poles?.[0],
    lastPole: poles.at(-1),
    totalNum: parseInt(data?.MRData?.total ?? "0"),
  };
}
