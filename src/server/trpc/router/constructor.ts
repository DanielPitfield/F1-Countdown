import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export type ConstructorInfo = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export const constructorRouter = router({
  // TODO
  getRaceWins: publicProcedure
    .input(z.object({ driverID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/constructors/${input}/results/1.json`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.DriverTable.Drivers[0];
    }),
});
