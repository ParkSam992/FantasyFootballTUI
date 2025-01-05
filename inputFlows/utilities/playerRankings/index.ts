import chalk from "chalk";
import { League } from "../../../types/league";
import { buildPlayerRankingTable } from "./buildPlayerRankingTable";
import {
  GetPlayerRankingsPrompt,
  rankingRefinement,
} from "./getPlayerRankingsPrompt";
import { getSelectInput } from "../../../prompts/getSelectInput";
import { GetPlayerRankingsFilterPrompt } from "./playerRankingsFilterPrompt";

export async function PlayerRankings(leagueInfo: League) {
  console.log("Displaying Player Rankings");

  const {
    showOneQBRanking,
    rankings,
    marketLabel,
  } = await GetPlayerRankingsPrompt();

  console.log(
    chalk.red.underline(
      `\n ${
        showOneQBRanking ? "One Quaterback" : "Superflex"
      } ${marketLabel} \n`
    )
  );

  let filteredRankings = rankings;
  let currentPage = 0;
  let table = buildPlayerRankingTable(rankings, showOneQBRanking, currentPage);
  let refinement = "REFINEMENT";
  console.log(table.toString());

  while (refinement != "BACK") {
    refinement = await getSelectInput(
      "How would you like to refine player data?",
      rankingRefinement
    );

    switch (refinement) {
      case "NEXT_PAGE":
        if (currentPage * 20 > rankings.length) {
          console.log("\n You are on the last page \n");
          break;
        }

        currentPage += 1;
        table = buildPlayerRankingTable(
          filteredRankings,
          showOneQBRanking,
          currentPage
        );
        console.log(table.toString());
        break;
      case "PREVIOUS_PAGE":
        if (currentPage === 0) {
          console.log("\n You are on the first page \n");
          break;
        }

        currentPage -= 1;
        table = buildPlayerRankingTable(
          filteredRankings,
          showOneQBRanking,
          currentPage
        );
        console.log(table.toString());
        break;
      case "ADD_FILTER":
        console.log(chalk.red("Filter not implemented"));
        filteredRankings = await GetPlayerRankingsFilterPrompt(rankings);
        currentPage = 0;
        table = buildPlayerRankingTable(
          filteredRankings,
          showOneQBRanking,
          currentPage
        );
        console.log(table.toString());
        break;
      case "BACK":
        return;
    }
  }
}
