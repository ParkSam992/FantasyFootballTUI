import chalk from "chalk";
import { getMarkets } from "../../fantasyFootballApi/getMarkets";
import { getPlayerRankings } from "../../fantasyFootballApi/getPlayerRankings";
import { getSelectInput } from "../../prompts/getSelectInput";
import { Player } from "../../types/player";
import { BuildCompareMarketTable } from "./buildTables/buildCompareMarketTable";
import { compareMarketPrompt, positions } from "./draftPrompts";
import { getDraftedPlayers } from "../../fantasyFootballApi/getDraftedPlayers";

export async function CompareMarket(
  sleeperRankings: Player[],
  draftId: string,
  leagueType: string,
  isOneQBDraft: boolean
) {
  const markets = await getMarkets();
  let nextPrompt = "COMPARE_MARKET";
  let selectedMarket = "";
  while (nextPrompt != "BACK") {
    if (nextPrompt == "COMPARE_MARKET") {
      selectedMarket = await getSelectInput(
        "Select Market to compare",
        markets.filter(
          (m) =>
            m.value != "STD_SLEEPER" &&
            m.value != "DYN_SLEEPER" &&
            m.value.startsWith(leagueType)
        )
      );
    }
    const selectedMarketName = markets.find((m) => m.value === selectedMarket)
      ?.label;

    const marketRankings = await getPlayerRankings(selectedMarket);
    const draftedPlayers = await getDraftedPlayers(draftId);

    const displayPosition = await getSelectInput("Which Position?", positions);

    if (displayPosition == "QB" || displayPosition == "ALL") {
      console.log(chalk.yellow(`\n Quarterbacks - ${selectedMarketName}\n`));
      console.log(
        BuildCompareMarketTable(
          sleeperRankings,
          marketRankings,
          draftedPlayers,
          "QB",
          isOneQBDraft
        ).toString()
      );
    }

    if (displayPosition == "WR" || displayPosition == "ALL") {
      console.log(chalk.yellow(`\n Wide Recievcers - ${selectedMarketName}\n`));
      console.log(
        BuildCompareMarketTable(
          sleeperRankings,
          marketRankings,
          draftedPlayers,
          "WR",
          isOneQBDraft
        ).toString()
      );
    }

    if (displayPosition == "RB" || displayPosition == "ALL") {
      console.log(chalk.yellow(`\n Running Backs - ${selectedMarketName}\n`));
      console.log(
        BuildCompareMarketTable(
          sleeperRankings,
          marketRankings,
          draftedPlayers,
          "RB",
          isOneQBDraft
        ).toString()
      );
    }

    if (displayPosition == "TE" || displayPosition == "ALL") {
      console.log(chalk.yellow(`\n Tight Ends - ${selectedMarketName}\n`));
      console.log(
        BuildCompareMarketTable(
          sleeperRankings,
          marketRankings,
          draftedPlayers,
          "TE",
          isOneQBDraft
        ).toString()
      );
    }

    nextPrompt = await getSelectInput("What now?", compareMarketPrompt);

    if (nextPrompt == "BACK") {
      return;
    }
  }
}
