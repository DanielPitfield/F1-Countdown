import { DriverSeasonResult } from "../server/trpc/router/driver";

export function getTotalNumChampionshipPoints(
  careerResults: DriverSeasonResult[] | undefined
): number {
  if (!careerResults) {
    return 0;
  }

  return (
    careerResults
      // Points from each season
      .map((x) => parseInt(x.DriverStandings[0]?.points ?? ""))
      // The sum of these values
      .reduce((a, b) => a + b, 0)
  );
}
