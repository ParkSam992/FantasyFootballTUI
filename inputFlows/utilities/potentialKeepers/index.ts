const Table = require("cli-table3");
import { getLeagueRosterRankings } from "../../../fantasyFootballApi/getLeagueRosterRankings";
import { getSelectInput } from "../../../prompts/getSelectInput";
import { BuildTeamRankingPlayer } from "./buildTeamRankingTable";
import { showOneQb } from "./potentialKeepersPrompts";
import { getMarkets } from "../../../fantasyFootballApi/getMarkets";
import chalk from "chalk";

export async function PotentialKeepers(leagueInfo: any) {
  console.log("Finding Potential Keepers");

  const markets = await getMarkets();

  const selectedMarket = await getSelectInput(
    "Which market do you want?",
    markets
  );

  const rankings = await getLeagueRosterRankings(
    leagueInfo.leagueId,
    selectedMarket
  );

  const showOneQBRanking =
    (await getSelectInput("Which rankings do you want?", showOneQb)) === "true";

  rankings.forEach((team) => {
    team.roster.sort(
      (a, b) =>
        parseInt(showOneQBRanking ? a.oneQbRanking : a.twoQbRanking) -
        parseInt(showOneQBRanking ? b.oneQbRanking : b.twoQbRanking)
    ); // Sort by points descending
  });

  markets.find((m) => m.value === selectedMarket);
  console.log(
    chalk.red.underline(
      `\n ${showOneQBRanking ? "One Quaterback" : "Superflex"} ${
        markets.find((m) => m.value === selectedMarket).label
      } \n`
    )
  );

  const table = BuildTeamRankingPlayer(rankings, showOneQBRanking);

  console.log(table.toString());
}
