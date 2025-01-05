import { spinner } from "@clack/prompts";
import { refreshPlayerData } from "../../fantasyFootballApi/refreshPlayerData";
import chalk from "chalk";

export async function RefreshPlayerRankings() {
  console.log("Refreshing Player Rankings");

  // TODO: Add are you sure?

  const s = spinner();
  s.start("Refreshing player data");
  const successfulRefresh = await refreshPlayerData();
  if (!successfulRefresh) {
    console.log("There was a problem refreshing player data");
    return;
  }
  s.stop(chalk.green("Successful refresh"));
}
