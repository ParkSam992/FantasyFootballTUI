import chalk from "chalk";
import { getPlayerData } from "../../fantasyFootballApi/getPlayerData";
import { PlayerSearchPrompt } from "../../prompts/playerSearchPrompt";
import { buildPlayerDataTable } from "./buildPlayerDataTable";
import { getSelectInput } from "../../prompts/getSelectInput";
import { dynastyOrRedraft } from "./playerSearchPrompts";

export async function PlayerSearch() {
  console.log("Searching Players");

  const playerId = await PlayerSearchPrompt();
  const market = await getSelectInput("Dynasty or Redraft?", dynastyOrRedraft);
  const playerData = await getPlayerData(playerId, market);

  const table = buildPlayerDataTable(playerData);
  console.log(table.toString());
}
