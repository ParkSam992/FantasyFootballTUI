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

export const getPlayerString = (
  player: any,
  showOneQBRanking: boolean,
  currentPick: number
) => {
  const rank = getRankDisplayColor(player.rank, currentPick);
  const adp = getRankDisplayColor(
    showOneQBRanking ? player.oneQbRanking : player.twoQbRanking,
    currentPick
  );

  return `${rank} | ${player.firstName} ${player.lastName} | ${adp}`;
};

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

// TODO: Adjust the range of these colors
export const getRankDisplayColor = (
  playerRank: number,
  currentPick: number
) => {
  playerRank = Number(playerRank);
  let rank;
  switch (true) {
    // assume pick 22
    case playerRank - currentPick < -5: // < 17
      rank = chalk.green(playerRank.toFixed(1));
      break;
    case playerRank - currentPick >= -5 && playerRank - currentPick < -1: // 17 - 20
      rank = chalk.cyan(playerRank.toFixed(1));
      break;
    case playerRank - currentPick <= 1 && playerRank - currentPick >= -1: // 21 - 23
      rank = playerRank.toFixed(1);
      break;
    case playerRank - currentPick <= 5 && playerRank - currentPick > 1: // 24 - 27
      rank = chalk.yellow(playerRank.toFixed(1));
      break;
    case playerRank - currentPick > 5: // >= 50
      rank = chalk.red(playerRank.toFixed(1));
      break;
    default:
      // should never hit this
      rank = chalk.magenta(playerRank.toFixed(1));
      break;
  }
  return rank;
};
