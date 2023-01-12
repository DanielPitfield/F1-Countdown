import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";
import { seasonRouter } from "./season";
import { GrandPrixWeekend } from "./grandPrix";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import { getNextEventInYear } from "../../../utils/getNextEventInYear";
import { Driver } from "./driver";
import { Team } from "./team";

// Create a caller to call queries from the seasonRouter directly from the server
const caller = seasonRouter.createCaller({ prisma });

export const homeRouter = router({
  getUpcomingGrandPrixWeekend: publicProcedure.query(
    async (): Promise<GrandPrixWeekend | undefined> => {
      // Using the current year can provide more up-to-date information
      const currentYearSchedule =
        (await caller.getSchedule({
          seasonID: getCurrentYear().toString(),
        })) ?? [];

      // TODO: Early return here if event has been found or would that be conditionally calling a hook?

      // Otherwise, try getting the next event using "current" field within request URL
      // TODO: The currentSeasonSchedule (if and when used) returns an incorrect next event
      const currentSeasonSchedule =
        (await caller.getSchedule({
          seasonID: "current",
        })) ?? [];

      return (
        getNextEventInYear(currentYearSchedule) ??
        getNextEventInYear(currentSeasonSchedule)
      );
    }
  ),

  getCurrentDrivers: publicProcedure.query(async (): Promise<Driver[]> => {
    // Getting the drivers from the driver standings of the current year can provide more up-to-date information
    const currentDriverStandings =
      (await caller.getDriverStandings({
        seasonID: getCurrentYear().toString(),
      })) ?? [];

    const drivers: Driver[] = currentDriverStandings.map(
      (standing) => standing.Driver
    );

    // TODO: Early return

    // Otherwise, try getting the current drivers using "current" field within request URL
    const API_URL = `http://ergast.com/api/f1/current/drivers.json`;

    const response = await fetch(API_URL);
    const data = await response.json();

    return drivers ?? data.MRData.DriverTable.Drivers;
  }),

  getCurrentTeams: publicProcedure.query(async (): Promise<Team[]> => {
    const currentTeamStandings =
      (await caller.getTeamStandings({
        seasonID: getCurrentYear().toString(),
      })) ?? [];
      
    const teams: Team[] = currentTeamStandings.map(
      (standing) => standing.Constructor
    );

    // TODO: Early return

    const API_URL = `http://ergast.com/api/f1/current/constructors.json`;

    const response = await fetch(API_URL);
    const data = await response.json();

    return teams ?? data.MRData.ConstructorTable.Constructors;
  }),
});
