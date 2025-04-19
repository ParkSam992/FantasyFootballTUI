import chalk from "chalk";
import { getPlayerData } from "../../fantasyFootballApi/getPlayerData";
import { PlayerSearchPrompt } from "../../prompts/playerSearchPrompt";
import { buildPlayerDataTable } from "./buildPlayerDataTable";

export async function PlayerSearch() {
  console.log("Searching Players");
  const playerId = await PlayerSearchPrompt();

  const playerData = await getPlayerData(playerId, "DYN");

  const table = buildPlayerDataTable(playerData);
  console.log(table.toString());
}
