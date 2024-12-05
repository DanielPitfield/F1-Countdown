import { Driver } from "./Driver";
import { Team } from "./Team";

export type DriverStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Team[];
};

export type TeamStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Team;
};
