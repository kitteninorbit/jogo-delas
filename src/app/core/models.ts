export interface Competition {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  logoUrl: string;
  instagramUrl?: string;
}

export interface Broadcast {
  id: number;
  platformName: string;
  platformUrl: string;
  isFree: boolean;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  matchDatetime: string;
  stage: string;
  stadium: string;
  competition: Competition;
  broadcasts: Broadcast[];
}
