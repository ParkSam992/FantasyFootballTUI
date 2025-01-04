import { getSelectInput } from "../../prompts/getSelectInput";
import { PlayerRankings } from "./playerRankings";
import { PotentialKeepers } from "./potentialKeepers";
import { utilityPrompt } from "./utilityPrompts";

export async function Utilities() {
  console.log("Displaying Utilities Functions");

  let utilityFunction = "UTILITIES";

  while (utilityFunction != "BACK") {
    utilityFunction = await getSelectInput(
      "Which Utility Function would you like?",
      utilityPrompt
    );

    switch (utilityFunction) {
      case "POTENTIAL_KEEPERS":
        await PotentialKeepers();
        break;
      case "PLAYER_RANKINGS":
        await PlayerRankings();
        break;
      case "BACK":
        return;
    }
  }
}
