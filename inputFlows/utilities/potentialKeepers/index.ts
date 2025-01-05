import { BuildTeamRankingPlayer } from "./buildTeamRankingTable";
import chalk from "chalk";
import { GetPlayerRankingsPrompt } from "../../../prompts/getPlayerRankingsPrompt";

export async function PotentialKeepers(leagueInfo: any) {
  console.log("Finding Potential Keepers");

  const {
    showOneQBRanking,
    rankings,
    marketLabel,
  } = await GetPlayerRankingsPrompt(leagueInfo);

  console.log(
    chalk.red.underline(
      `\n ${
        showOneQBRanking ? "One Quaterback" : "Superflex"
      } ${marketLabel} \n`
    )
  );

  const table = BuildTeamRankingPlayer(rankings, showOneQBRanking);

  console.log(table.toString());
}
