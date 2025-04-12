import { getPlayerSearch } from "../fantasyFootballApi/getPlayerSearch";
import { getSelectInput } from "./getSelectInput";
import { getTextInput } from "./getTextInput";

export async function PlayerSearchPrompt(prompt?: string) {
  var player = null;

  while (player == null) {
    var playerName = await getTextInput(prompt ?? "Player Name");

    var playerOptions = await getPlayerSearch(playerName);

    if (playerOptions.length == 1) {
      return playerOptions[0].value;
    }

    if (playerOptions.length > 1) {
      player = await getSelectInput("Which Player do you want?", playerOptions);
    }
  }

  return player;
}
