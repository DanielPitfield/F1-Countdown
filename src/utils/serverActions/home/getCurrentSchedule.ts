"use server";

import { getCurrentYear } from "../../getCurrentYear";
import { GrandPrixWeekend } from "../../types/GrandPrix";
import { getSeasonSchedule } from "../season/getSeasonSchedule";

export async function getCurrentSchedule(): Promise<GrandPrixWeekend[]> {
  return (
    (await getSeasonSchedule({
      seasonID: getCurrentYear().toString(),
    })) ??
    (await getSeasonSchedule({
      seasonID: "current",
    }))
  );
}
