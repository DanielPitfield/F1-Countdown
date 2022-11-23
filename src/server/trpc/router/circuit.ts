import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { RaceHistory } from "./statistics";
import { MAX_LIMIT } from "../../../utils/limits";

export type CircuitInfo = {
  circuitID: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
};

export const circuitRouter = router({
  getInfo: publicProcedure
    .input(z.object({ circuitID: z.string().min(1).trim() }))
    .query(async ({ input }): Promise<CircuitInfo> => {
      const API_URL = `http://ergast.com/api/f1/circuits/${input.circuitID}.json?limit=1`;

      const response = await fetch(API_URL);
      const data = await response.json();

      return await data.MRData.CircuitTable.Circuits[0];
    }),

  getWinners: publicProcedure
    .input(z.object({ circuitID: z.string().min(1).trim() }))
    .query(
      async ({
        input,
      }): Promise<{
        results: RaceHistory[];
        firstYear: string;
        totalNum: number;
      }> => {
        const API_URL = `https://ergast.com/api/f1/circuits/${input.circuitID}/results/1.json?limit=${MAX_LIMIT}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        return {
          results: data.MRData.RaceTable.Races,
          firstYear: data.MRData.RaceTable.Races[0].season,
          totalNum: parseInt(data.MRData.total),
        };
      }
    ),
});
