const Table = require("cli-table3");
import { Player } from "../../../types/player";

export const buildPlayerRankingTable = (
  rankings: Player[],
  showOneQBRanking: boolean,
  pageNumber: number
): any => {
  const table = new Table({
    head: ["Rank", "Player Name", "Position", "ADP"],
    style: {
      head: ["blue"],
      border: ["grey"],
    },
  });

  rankings.slice(pageNumber * 20, (pageNumber + 1) * 20).forEach((p, idx) => {
    table.push([
      idx + 1 + pageNumber * 20,
      p.firstName + " " + p.lastName,
      p.position,
      Number(showOneQBRanking ? p.oneQbRanking : p.twoQbRanking).toFixed(1),
    ]);
  });

  return table;
};
