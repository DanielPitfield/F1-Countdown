"use server";

import { BASE_API_URL } from "../../../data/CONSTANTS";
import { getCurrentYear } from "../../getCurrentYear";
import { getSeasonTeamStandings } from "../season/getSeasonTeamStandings";
import type { Team } from "../../types/Team";

export async function getCurrentTeams(): Promise<Team[]> {
  const teams: Team[] = (
    await getSeasonTeamStandings({
      seasonID: getCurrentYear().toString(),
    })
  ).map((standing) => standing.Constructor);

  if (teams) {
    return teams;
  }

  const API_URL = `${BASE_API_URL}/current/constructors.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.ConstructorTable.Constructors;
}
