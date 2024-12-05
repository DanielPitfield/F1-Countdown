"use server";

import { GrandPrixWeekend } from "../../types/GrandPrix";

export async function getGrandPrixSchedule(config: { season: string; roundNumber: string }): Promise<GrandPrixWeekend> {
  const API_URL = `https://ergast.com/api/f1/${config.season}/${config.roundNumber}.json`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.MRData.RaceTable.Races[0];
}
