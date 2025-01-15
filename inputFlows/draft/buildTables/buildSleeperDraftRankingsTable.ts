const Table = require("cli-table3");
import chalk from "chalk";
import { Player } from "../../../types/player";
import {
  addRanksToPlayers,
  getTopPlayers,
  getPlayerString,
} from "./buildTableHelpers";

export const BuildDraftRankingsTable = (
  rankings: Player[],
  draftedPlayers: Player[],
  isOneQBDraft: boolean
): any => {
  const table = new Table({
    head: [
      "Rank | Quarterback | ADP",
      "Rank | Wide Recievcer | ADP",
      "Rank | Running Back | ADP",
      "Rank | Tight End | ADP",
    ],
    style: {
      head: ["blue"],
      border: ["grey"],
    },
  });
  const rankedPlayers = addRanksToPlayers(rankings, isOneQBDraft);

  // TODO: draftedPlayers.length gives me what pick is next (think about this with keepers, idk how that works)
  const currentPick = draftedPlayers.length + 1;

  const topQuarterbacks = getTopPlayers(
    rankedPlayers,
    draftedPlayers,
    "QB",
    isOneQBDraft
  );
  const topWideRecievers = getTopPlayers(
    rankedPlayers,
    draftedPlayers,
    "WR",
    isOneQBDraft
  );
  const topRunningBacks = getTopPlayers(
    rankedPlayers,
    draftedPlayers,
    "RB",
    isOneQBDraft
  );
  const topTightEnds = getTopPlayers(
    rankedPlayers,
    draftedPlayers,
    "TE",
    isOneQBDraft
  );

  for (let i = 0; i < 5; i++) {
    table.push([
      getPlayerString(topQuarterbacks[i], isOneQBDraft, currentPick),
      getPlayerString(topWideRecievers[i], isOneQBDraft, currentPick),
      getPlayerString(topRunningBacks[i], isOneQBDraft, currentPick),
      getPlayerString(topTightEnds[i], isOneQBDraft, currentPick),
    ]);
  }

  return table;
};
