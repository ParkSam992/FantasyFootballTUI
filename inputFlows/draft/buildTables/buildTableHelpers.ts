import chalk from "chalk";
import { Player } from "../../../types/player";

export const addRanksToPlayers = (
  players: Player[],
  isOneQBDraft: boolean
): any[] => {
  return players
    .slice()
    .sort(
      (a, b) =>
        Number(isOneQBDraft ? a.oneQbRanking : a.twoQbRanking) -
        Number(isOneQBDraft ? b.oneQbRanking : b.twoQbRanking)
    )
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));
};

export const getPlayerString = (player: any, showOneQBRanking) =>
  `${player.rank} | ${player.firstName} ${player.lastName} | ${Number(
    showOneQBRanking ? player.oneQbRanking : player.twoQbRanking
  ).toFixed(1)}`;

export const getTopPlayers = (
  rankings: Player[],
  playersAlreadyDrafted: Player[],
  position: string,
  showOneQBRanking: boolean
): Player[] =>
  rankings
    .filter(
      (player) =>
        player.position === position &&
        !playersAlreadyDrafted.some((pai) => pai.sleeperId === player.sleeperId)
    )
    .sort(
      (a, b) =>
        Number(showOneQBRanking ? a.oneQbRanking : a.twoQbRanking) -
        Number(showOneQBRanking ? b.oneQbRanking : b.twoQbRanking)
    )
    .slice(0, 5);

export const getDifferenceDisplayColor = (diff: number) => {
  switch (true) {
    case diff > 5:
      return chalk.greenBright(diff.toFixed(1));
    case diff > 1:
      return chalk.green(diff.toFixed(1));
    case diff > -2:
      return chalk.yellow(diff.toFixed(1));
    case diff > -5:
      return chalk.red(diff.toFixed(1));
    case diff <= -5:
      return chalk.redBright(diff.toFixed(1));
  }
};
