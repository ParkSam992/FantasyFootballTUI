import chalk from "chalk";
import { getConfirmInput } from "../prompts/getConfirmInput";
import { getSelectInput } from "../prompts/getSelectInput";
import { firstQuestion } from "../promptConstants";
import { Utilities } from "./utilities/index";
import { CollectLeagueInfo } from "./leagueInfo";
import { TradeCalculator } from "./tradeCalculator";
import { Draft } from "./draft";
import { RefreshPlayerRankings } from "./refreshPlayerRankings";

export async function FantasyFootballTUI() {
  let direction = "BEGIN";

  const leagueInfo = await CollectLeagueInfo();
  // TODO: If info is bad, re-collect, or exit

  while (direction != "EXIT") {
    console.log("\n" + chalk.blue(leagueInfo.name + leagueInfo.season));

    direction = await getSelectInput(
      "What would you like to do?",
      firstQuestion
    );

    if (direction === "EXIT") {
      const exitBool = await getConfirmInput("Are you sure you want to exit?");
      if (!exitBool) {
        direction = "NO_EXIT";
      }
    }

    switch (direction) {
      case "BEGIN_DRAFT":
        Draft();
        break;
      case "TRADE_CALCULATOR":
        TradeCalculator();
        break;
      case "UTILITIES":
        Utilities();
        break;
      case "REFRESH_PLAYER_RANKINGS":
        RefreshPlayerRankings();
        break;
      case "EXIT":
        console.log("Goodbye");
    }
  }
}
