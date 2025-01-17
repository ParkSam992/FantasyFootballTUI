import chalk from "chalk";
import { getMarkets } from "../../fantasyFootballApi/getMarkets";
import { getPlayerRankings } from "../../fantasyFootballApi/getPlayerRankings";
import { getSelectInput } from "../../prompts/getSelectInput";
import { Player } from "../../types/player";
import { BuildCompareMarketTable } from "./buildTables/buildCompareMarketTable";
import { compareMarketPrompt, positions } from "./draftPrompts";
import { getDraftedPlayers } from "../../fantasyFootballApi/getDraftedPlayers";
import { getMultiSelectChoices } from "../../prompts/getMultiSelectChoices";

export async function CompareMarket(
  sleeperRankings: Player[],
  draftId: string,
  isDynasty: boolean,
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
            m.value.startsWith(isDynasty ? "DYN" : "STD")
        )
      );
    }
    const selectedMarketName = markets.find((m) => m.value === selectedMarket)
      ?.label;

    const marketRankings = await getPlayerRankings(selectedMarket);
    const draftedPlayers = await getDraftedPlayers(draftId);
    const currentPick = draftedPlayers.length + 1;

    const displayPosition = await getMultiSelectChoices(
      "Which Positions?",
      positions
    );

    if (displayPosition.includes("QB") || displayPosition.includes("ALL")) {
      console.log(
        chalk.yellow.bold(`\n Quarterbacks - ${selectedMarketName}\n`)
      );
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

    if (displayPosition.includes("WR") || displayPosition.includes("ALL")) {
      console.log(
        chalk.yellow.bold(
          `\n Wide Recievcers - ${selectedMarketName} - Pick #${currentPick} \n`
        )
      );
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

    if (displayPosition.includes("RB") || displayPosition.includes("ALL")) {
      console.log(
        chalk.yellow.bold(
          `\n Running Backs - ${selectedMarketName} - Pick #${currentPick} \n`
        )
      );
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

    if (displayPosition.includes("TE") || displayPosition.includes("ALL")) {
      console.log(
        chalk.yellow.bold(
          `\n Tight Ends - ${selectedMarketName} - Pick #${currentPick} \n`
        )
      );
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
