import { getLeagueRosterRankings } from "../fantasyFootballApi/getLeagueRosterRankings";
import { getMarkets } from "../fantasyFootballApi/getMarkets";
import { getSelectInput } from "./getSelectInput";
import { User } from "../types/user";

export async function GetPlayerRankingsPrompt(
  leagueInfo: any
): Promise<{
  showOneQBRanking: boolean;
  rankings: User[];
  marketLabel: string;
}> {
  const markets = await getMarkets();

  const selectedMarket = await getSelectInput(
    "Which market do you want?",
    markets
  );

  const marketLabel =
    markets.find((m) => m.value === selectedMarket)?.label ?? "Unknown Market";

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

  return { showOneQBRanking, rankings, marketLabel };
}

const showOneQb = [
  {
    label: "Show Single Quarterback Rankings",
    value: "true",
  },
  {
    label: "Show Superflex rankings",
    value: "false",
  },
];
