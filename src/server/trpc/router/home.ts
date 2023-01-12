import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";
import { seasonRouter } from "./season";
import { GrandPrixWeekend } from "./grandPrix";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import { getNextEventInYear } from "../../../utils/getNextEventInYear";
import { Driver } from "./driver";
import { Team } from "./team";
import { Circuit } from "./circuit";

// Create a caller to call queries from the seasonRouter directly from the server
const caller = seasonRouter.createCaller({ prisma });

export const homeRouter = router({
  getUpcomingGrandPrixWeekend: publicProcedure.query(
    async (): Promise<GrandPrixWeekend | undefined> => {
      return (
        getNextEventInYear(
          // Using the current year can provide more up-to-date information
          await caller.getSchedule({
            seasonID: getCurrentYear().toString(),
          })
        ) ??
        getNextEventInYear(
          // Otherwise, try getting the next event using "current" field within request URL
          await caller.getSchedule({
            seasonID: "current",
          })
        )
      );
    }
  ),

  getCurrentSchedule: publicProcedure.query(
    async (): Promise<GrandPrixWeekend[]> => {
      return (
        (await caller.getSchedule({
          seasonID: getCurrentYear().toString(),
        })) ??
        (await caller.getSchedule({
          seasonID: "current",
        }))
      );
    }
  ),

  getCurrentDrivers: publicProcedure.query(async (): Promise<Driver[]> => {
    // Getting the drivers from the driver standings of the current year can provide more up-to-date information
    const drivers: Driver[] = (
      await caller.getDriverStandings({
        seasonID: getCurrentYear().toString(),
      })
    ).map((standing) => standing.Driver);

    if (drivers) {
      return drivers;
    }

    // Otherwise, try getting the current drivers using "current" field within request URL
    const API_URL = `http://ergast.com/api/f1/current/drivers.json`;

    const response = await fetch(API_URL);
    const data = await response.json();

    return data.MRData.DriverTable.Drivers;
  }),

  getCurrentTeams: publicProcedure.query(async (): Promise<Team[]> => {
    const teams: Team[] = (
      await caller.getTeamStandings({
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
  }),

  getCurrentCircuits: publicProcedure.query(async (): Promise<Circuit[]> => {
    return (
      (await caller.getCircuits({
        seasonID: getCurrentYear().toString(),
      })) ??
      (await caller.getCircuits({
        seasonID: "current",
      }))
    );
  }),
});
