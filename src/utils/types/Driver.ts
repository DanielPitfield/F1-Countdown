import { DriverStanding } from "./Statistics";

export type Driver = {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

// Shape of fetched data for the finishing result of a driver in the world championship
export type DriverSeasonResultResponse = {
  season: string;
  round: string;
  // Property name and array INCORRECTLY suggest this is the driverStandings for every driver
  DriverStandings: DriverStanding[];
};

export type DriverSeasonResult = {
  // The year of the championship season
  season: string;
  // The round number of the last race in the season
  round: string;
  // The finishing result of a driver in the world championship (at the end of the season)
  driverStanding: DriverStanding;
};
