import chalk from "chalk";
import { getMarkets } from "../../fantasyFootballApi/getMarkets";
import { getSelectInput } from "../../prompts/getSelectInput";
import { differentMarketPrompt } from "./draftPrompts";
import { BuildDraftRankingsTable } from "./buildTables/buildSleeperDraftRankingsTable";
import { getPlayerRankings } from "../../fantasyFootballApi/getPlayerRankings";
import { getDraftedPlayers } from "../../fantasyFootballApi/getDraftedPlayers";

export async function DifferentMarketRankings(
  draftId: string,
  leagueId: string,
  isDynasty: boolean,
  isOneQBDraft: boolean
) {
  const markets = await getMarkets();
  let nextPrompt = "DIFFERENT_MARKET";
  let selectedMarket = "";
  while (nextPrompt != "BACK") {
    if (nextPrompt == "DIFFERENT_MARKET") {
      selectedMarket = await getSelectInput(
        "Select Market to compare",
        markets.filter(
          (m) =>
            m.value != "STD_SLEEPER" &&
            m.value != "DYN_SLEEPER" &&
            !m.value.startsWith(isDynasty ? "STD" : "DYN")
        )
      );
    }

    const selectedMarketName = markets.find((m) => m.value === selectedMarket)
      ?.label;
    const marketRankings = await getPlayerRankings(selectedMarket);
    const draftedPlayers = await getDraftedPlayers(draftId, leagueId);
    const currentPick = draftedPlayers.length + 1;

    console.log(
      chalk.yellow(
        `\n ${selectedMarketName} - Current Draft Pick #${currentPick}\n`
      )
    );
    console.log(
      BuildDraftRankingsTable(
        marketRankings,
        draftedPlayers,
        isOneQBDraft
      ).toString()
    );

    nextPrompt = await getSelectInput("What now?", differentMarketPrompt);
  }
}
