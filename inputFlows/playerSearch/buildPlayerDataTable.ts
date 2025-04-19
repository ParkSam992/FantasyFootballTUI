import chalk from "chalk";
import { PlayerData } from "../../types/playerData";

const Table = require("cli-table3");

export const buildPlayerDataTable = (player: PlayerData): any => {
  const table = new Table({
    head: [
      chalk.red(
        player.firstName + " " + player.lastName + " | " + player.position
      ),
      ...Object.keys(player.rankings),
    ],
    style: {
      head: ["blue"],
      border: ["grey"],
    },
  });

  table.push([
    "Single Quarterback",
    ...Object.values(player.rankings).map((r) => r.oneQBRanking),
  ]);
  table.push([
    "Superflex",
    ...Object.values(player.rankings).map((r) => r.twoQBRanking),
  ]);

  return table;
};
