import { PlayerSearchPrompt } from "../../prompts/playerSearchPrompt";

export async function PlayerSearch() {
  console.log("Searching Players");
  var playerId = await PlayerSearchPrompt();
  console.log(playerId);
}
