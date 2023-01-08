import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";
import { getCurrentYear } from "./getCurrentYear";
import { getNextEventInYear } from "./getNextEventInYear";
import { trpc } from "./trpc";

export function getUpcomingGrandPrixWeekend(): GrandPrixWeekend | undefined {
  /*
  Try getting the next event within the schedule of the current year first 
  (this is able to return the schedule of a season that has yet to start)
  (For instance, at the end of a season but into the next year)
  */
  const { data: currentYearSchedule } = trpc.season.getSchedule.useQuery({
    seasonID: getCurrentYear().toString(),
  });
  
  // TODO: Early return here if event has been found or would that be conditionally calling a hook?
  // TODO: The currentSeasonSchedule returns an incorrect next event

  // Otherwise, try getting the next event using "current" field within request URL
  const { data: currentSeasonSchedule } = trpc.season.getSchedule.useQuery({
    seasonID: "current",
  });

  return (
    getNextEventInYear(currentYearSchedule ?? []) ??
    getNextEventInYear(currentSeasonSchedule ?? [])
  );
}
