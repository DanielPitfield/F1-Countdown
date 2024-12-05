"use server";

import { getCurrentYear } from "../../getCurrentYear";
import { Team } from "../../types/Team";
import { getSeasonTeamStandings } from "../season/getSeasonTeamStandings";

export async function getCurrentTeams(): Promise<Team[]> {
  const teams: Team[] = (
    await getSeasonTeamStandings({
      seasonID: getCurrentYear().toString(),
    })
  ).map((standing) => standing.Constructor);

  if (teams) {
    return teams;
  }

  const API_URL = `http://ergast.com/api/f1/current/constructors.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.ConstructorTable.Constructors;
}
