import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export type DriverInfo = {
  driverId: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export const driverRouter = router({
  getDriverInfo: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/drivers/${input}/driverInformation.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return data;
    }),
});
