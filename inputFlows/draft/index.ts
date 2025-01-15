import { getDraftedPlayers } from "../../fantasyFootballApi/getDraftedPlayers";
import { getPlayerRankings } from "../../fantasyFootballApi/getPlayerRankings";
import { getTextInput } from "../../prompts/getTextInput";
import { getSelectInput } from "../../prompts/getSelectInput";
import { BuildDraftRankingsTable } from "./buildTables/buildSleeperDraftRankingsTable";
import { dynastyOrRedraft, midDraftOptions, oneQbDraft } from "./draftPrompts";
import { CompareMarket } from "./compareMarket";
import { DifferentMarketRankings } from "./differentMarketRankings";
import chalk from "chalk";

export async function Draft() {
  console.log("Beginning Draft");

  // TODO: Can I use info gathered about the league to determine below things?

  const leagueType = await getSelectInput(
    "What type of league is this?",
    dynastyOrRedraft
  );

  if (leagueType === "BACK") {
    return;
  }

  const isOneQBDraft =
    (await getSelectInput("What type of draft is this?", oneQbDraft)) ===
    "true";

  const draftId = await getTextInput("Please Enter Draft Id");

  const sleeperRankings = await getPlayerRankings(
    leagueType === "STD" ? "STD_SLEEPER" : "DYN_SLEEPER"
  );

  let draftOptions = "BEGIN_DRAFT";
  while (draftOptions != "DRAFT_ENDED") {
    let draftedPlayers = await getDraftedPlayers(draftId);

    // TODO: I would like to add coloring to each of the tables based on current draft pick number.
    // If its pick 10, I want green on anything less, red on more, (yellow if close)
    const table = BuildDraftRankingsTable(
      sleeperRankings,
      draftedPlayers,
      isOneQBDraft
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
        await DifferentMarketRankings(draftId, leagueType, isOneQBDraft);
        break;
      case "COMPARE_MARKET":
        await CompareMarket(sleeperRankings, draftId, leagueType, isOneQBDraft);
        break;
      case "BACK":
        return;
    }
  }
}
