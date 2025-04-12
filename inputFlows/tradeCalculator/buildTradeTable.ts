import { TradePlayer } from "../../types/tradePlayer";

const Table = require("cli-table3");

export const buildTradeTable = (
  teams: Record<string, TradePlayer[]>,
  leagueType: string
): any => {
  const teamNames = Object.keys(teams);
  const table = new Table({
    head: teamNames,
    style: {
      head: ["blue"],
      border: ["grey"],
    },
  });

  // Find the max number of players on any team to know how many rows we need
  const maxRows = Math.max(...teamNames.map((team) => teams[team].length));

  for (let i = 0; i < maxRows; i++) {
    const row = teamNames.map((team) => {
      const player = teams[team][i];
      return player ? formatPlayer(player, leagueType) : ""; // fallback for uneven lengths
    });

    table.push(row);
  }

  const rowSum: string[] = [];

  teamNames.forEach((t) => {
    let sum = 0;
    teams[t].forEach((p) => {
      sum += Number(leagueType === "SF" ? p.sfTradeValue : p.tradeValue);
    });
    rowSum.push(sum.toFixed(1));
  });
  table.push(rowSum);

  return table;
};

const formatPlayer = (player: TradePlayer, leagueType: string) => {
  return (
    player.firstName +
    " " +
    player.lastName +
    " | " +
    player.position +
    " | " +
    (leagueType === "SF"
      ? Number(player.sfTradeValue).toFixed(1)
      : Number(player.tradeValue).toFixed(1))
  );
};
