import { getMarkets } from "../../../fantasyFootballApi/getMarkets";
import { getplayerRankings } from "../../../fantasyFootballApi/getPlayerRankings";
import { getSelectInput } from "../../../prompts/getSelectInput";
import { Player } from "../../../types/player";

export async function GetPlayerRankingsPrompt(): Promise<{
  showOneQBRanking: boolean;
  rankings: Player[];
  marketLabel: string;
}> {
  const markets = await getMarkets();

  const selectedMarket = await getSelectInput(
    "Which market do you want?",
    markets
  );

  const marketLabel =
    markets.find((m) => m.value === selectedMarket)?.label ?? "Unknown Market";

  const rankings = await getplayerRankings(selectedMarket);

  const showOneQBRanking =
    (await getSelectInput("Which rankings do you want?", showOneQb)) === "true";

  rankings.sort(
    (a, b) =>
      parseInt(showOneQBRanking ? a.oneQbRanking : a.twoQbRanking) -
      parseInt(showOneQBRanking ? b.oneQbRanking : b.twoQbRanking)
  ); // Sort by points descending

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

export const rankingRefinement = [
  {
    label: "Add filter",
    value: "ADD_FILTER",
  },
  {
    label: "Next page",
    value: "NEXT_PAGE",
  },
  {
    label: "Previous page",
    value: "PREVIOUS_PAGE",
  },
  {
    label: "Back",
    value: "BACK",
  },
];
