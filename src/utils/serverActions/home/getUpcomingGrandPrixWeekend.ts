"use server";

import { getCurrentYear } from "../../getCurrentYear";
import { getUpcomingEvent } from "../../getUpcomingEvent";
import { GrandPrixWeekend } from "../../types/GrandPrix";
import { getSeasonSchedule } from "../season/getSeasonSchedule";

export async function getUpcomingGrandPrixWeekend(): Promise<GrandPrixWeekend | null> {
  return (
    // Using the current year can provide more up-to-date information
    getUpcomingEvent(
      await getSeasonSchedule({
        seasonID: getCurrentYear().toString(),
      })
    ) ??
    // Otherwise, try getting the next event using "current" field within request URL
    getUpcomingEvent(
      await getSeasonSchedule({
        seasonID: "current",
      })
    ) ??
    /*
      Oherwise, explicitly return null (and not undefined) 
      So that not finding an event can be differentiated from the fetch request/response not yet being complete
    */
    null
  );
}
