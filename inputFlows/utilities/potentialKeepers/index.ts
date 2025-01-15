import { BuildTeamRankingPlayer } from "./buildTeamRankingTable";
import chalk from "chalk";
import { GetTeamPlayerRankingsPrompt } from "./getTeamPlayerRankingsPrompt";
import { League } from "../../../types/league";

export async function PotentialKeepers(leagueInfo: League) {
  console.log("Finding Potential Keepers");

  const {
    showOneQBRanking,
    rankings,
    marketLabel,
  } = await GetTeamPlayerRankingsPrompt(leagueInfo);

  console.log(
    chalk.red.bold(
      `\n ${
        showOneQBRanking ? "One Quaterback" : "Superflex"
      } ${marketLabel} \n`
    )
  );

  const table = BuildTeamRankingPlayer(rankings, showOneQBRanking);

  console.log(table.toString());
}
