export type League = {
  leagueId: string;
  name: string;
  season: string;
  draft_id: string;
  settings: LeagueSettings;
  roster_positions: string[];
};

type LeagueSettings = {
  type: number;
};
