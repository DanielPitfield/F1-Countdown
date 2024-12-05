"use server";

import { Team } from "../../types/Team";

export async function getTeamInfo(config: { teamID: string }): Promise<Team> {
  const API_URL = `http://ergast.com/api/f1/constructors/${config.teamID}.json?limit=1`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.ConstructorTable.Constructors[0];
}
