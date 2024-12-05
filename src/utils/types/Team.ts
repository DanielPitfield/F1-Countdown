import { TeamStanding } from "./Statistics";

export type Team = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export type TeamSeasonResultResponse = {
  season: string;
  round: string;
  ConstructorStandings: TeamStanding[];
};

export type TeamSeasonResult = {
  season: string;
  round: string;
  teamStanding: TeamStanding;
};
