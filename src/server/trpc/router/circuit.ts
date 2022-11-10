import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export type CircuitInfo = {
  circuitID: string;
  url: string;
  circuitName: string;
  location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
};

export const circuitRouter = router({
  getInfo: publicProcedure
    .input(z.object({ circuitID: z.string().min(1).trim() }))
    .query(async ({ input }) => {
      const API_URL = `http://ergast.com/api/f1/circuits/${input.circuitID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return (await data.MRData.CircuitTable.Circuit[0]) as CircuitInfo;
    }),

  // TODO: Get circuit winners
});
