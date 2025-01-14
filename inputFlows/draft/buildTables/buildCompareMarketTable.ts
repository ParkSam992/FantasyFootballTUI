import chalk from "chalk";
import { Player } from "../../../types/player";
import {
  addRanksToPlayers,
  getDifferenceDisplayColor,
  getTopPlayers,
} from "./buildTableHelpers";

const Table = require("cli-table3");

export const BuildCompareMarketTable = (
  sleeperRankings: Player[],
  marketRankings: Player[],
  playersDrafted: Player[],
  position: string,
  isOneQBDraft: boolean
): any => {
  const table = new Table({
    head: [
      "Name",
      "Sleeper Rank",
      "Sleeper ADP",
      "Market Rank",
      "Market ADP",
      "Rank Difference",
      "ADP Difference",
    ],
    style: {
      head: ["blue"],
      border: ["grey"],
    },
  });

  const rankedSleeperPlayers = addRanksToPlayers(sleeperRankings, isOneQBDraft);
  const rankedMarketPlayers = addRanksToPlayers(marketRankings, isOneQBDraft);

  const topSleeperPlayers = getTopPlayers(
    rankedSleeperPlayers,
    playersDrafted,
    position,
    isOneQBDraft
  );

  topSleeperPlayers.forEach((p: any) => {
    const marketPlayer = rankedMarketPlayers.find(
      (mp) => mp.sleeperId === p.sleeperId
    );

    const rankDiff = p.rank - marketPlayer.rank;

    const adpDiff =
      (isOneQBDraft ? p.oneQbRanking : p.twoQbRanking) -
      (isOneQBDraft ? marketPlayer.oneQbRanking : marketPlayer.twoQbRanking);

    table.push([
      `${p.firstName} ${p.lastName}`,
      p.rank,
      isOneQBDraft ? p.oneQbRanking : p.twoQbRanking,
      marketPlayer.rank,
      isOneQBDraft
        ? Number(marketPlayer.oneQbRanking).toFixed(1)
        : Number(marketPlayer.twoQbRanking).toFixed(1),
      getDifferenceDisplayColor(rankDiff),
      getDifferenceDisplayColor(adpDiff),
    ]);
  });

  return table;
};
