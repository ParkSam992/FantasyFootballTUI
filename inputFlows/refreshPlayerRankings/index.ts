import { spinner } from "@clack/prompts";
import { refreshPlayerData } from "../../fantasyFootballApi/refreshPlayerData";
import chalk from "chalk";
import { getConfirmInput } from "../../prompts/getConfirmInput";

export async function RefreshPlayerRankings() {
  console.log("Refreshing Player Rankings");

  const areYouSure = await getConfirmInput(
    "Refresh might take a second, are you sure you want to refresh?"
  );
  if (!areYouSure) {
    return;
  }

  const s = spinner();
  s.start("Refreshing player data");
  const successfulRefresh = await refreshPlayerData();
  if (!successfulRefresh) {
    console.log("There was a problem refreshing player data");
    return;
  }
  s.stop(chalk.green("Successful refresh"));
}
