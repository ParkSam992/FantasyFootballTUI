export type PlayerData = {
  sleeperId: string;
  firstName: string;
  lastName: string;
  position: string;
  rankings: Record<string, Ranking>;
};

export type Ranking = {
  oneQBRanking: string;
  twoQBRanking: string;
};
