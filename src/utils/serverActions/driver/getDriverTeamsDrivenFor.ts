"use server";

import { MAX_LIMIT } from "../../../data/limits";

import { Team } from "../../types/Team";

export async function getDriverTeamsDrivenFor(config: { driverID: string }): Promise<Team[]> {
  const API_URL = `http://ergast.com/api/f1/drivers/${config.driverID}/constructors.json?limit=${MAX_LIMIT}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.ConstructorTable.Constructors;
}
