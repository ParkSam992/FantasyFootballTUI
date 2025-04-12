import { getDraftedPlayers } from "../../fantasyFootballApi/getDraftedPlayers";
import { getPlayerRankings } from "../../fantasyFootballApi/getPlayerRankings";
import { getTextInput } from "../../prompts/getTextInput";
import { getSelectInput } from "../../prompts/getSelectInput";
import { BuildDraftRankingsTable } from "./buildTables/buildSleeperDraftRankingsTable";
import {
  dynastyOrRedraft,
  getDraftPrompt,
  midDraftOptions,
  oneQbDraft,
} from "./draftPrompts";
import { CompareMarket } from "./compareMarket";
import { DifferentMarketRankings } from "./differentMarketRankings";
import chalk from "chalk";
import { League } from "../../types/league";
import { getDraftInfo } from "../../fantasyFootballApi/getDraftInfo";

export async function Draft(league: League) {
  console.log("Beginning Draft");

  // TODO: Can I use info gathered about the league to determine below things?

  // TODO: I might want to consider not showing ADP, but showing average rankings

  let draftId = await getSelectInput(
    "Use Selected League Draft?",
    getDraftPrompt(league.name, league.draft_id)
  );

  if (draftId === "BACK") {
    return;
  }

  if (draftId === "DIFFERENT_DRAFT") {
    draftId = await getTextInput("Please Enter Draft Id");
  }

  const draftInfo = await getDraftInfo(draftId);
  const isDynasty = draftInfo.isDynasty;
  const isOneQb = draftInfo.isOneQb;

  const sleeperRankings = await getPlayerRankings(
    isDynasty ? "STD_SLEEPER" : "DYN_SLEEPER"
  );

  let draftOptions = "BEGIN_DRAFT";
  while (draftOptions != "DRAFT_ENDED") {
    let draftedPlayers = await getDraftedPlayers(draftId);

    const table = BuildDraftRankingsTable(
      sleeperRankings,
      draftedPlayers,
      isOneQb
    );

    console.log(
      chalk.yellow.bold(
        `\n Sleeper Rankings - Current Draft Pick #${draftedPlayers.length +
          1}\n`
      )
    );
    console.log(table.toString());

    draftOptions = await getSelectInput(
      "What would you like to do?",
      midDraftOptions
    );

    switch (draftOptions) {
      case "REFRESH_DRAFTED_PLAYERS":
        // always refreshes at beginning of loop
        break;
      case "DIFFERENT_MARKET":
        await DifferentMarketRankings(draftId, isDynasty, isOneQb);
        break;
      case "COMPARE_MARKET":
        await CompareMarket(sleeperRankings, draftId, isDynasty, isOneQb);
        break;
      case "BACK":
        return;
    }
  }
}
