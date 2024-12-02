import { DriverSeasonResult } from "./types/Driver";

// TODO: Generic so this can be applied for teams?
export function getTotalNumChampionshipPoints(careerResults: DriverSeasonResult[] | undefined): number {
  if (!careerResults) {
    return 0;
  }

  return (
    careerResults
      // Points from each season
      .map((x) => parseInt(x.driverStanding?.points ?? ""))
      // The sum of these values
      .reduce((a, b) => a + b, 0)
  );
}
