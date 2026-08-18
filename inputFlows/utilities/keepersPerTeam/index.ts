import { BuildTeamRankingPlayer } from "../potentialKeepers/buildTeamRankingTable";
import chalk from "chalk";
import { GetKeepersPerTeamPrompt } from "./getKeepersPerTeamPrompt";
import { League } from "../../../types/league";

export async function KeepersPerTeam(leagueInfo: League) {
  console.log("Finding Keepers Per Team");

  const {
    showOneQBRanking,
    rankings,
    marketLabel,
  } = await GetKeepersPerTeamPrompt(leagueInfo);

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
