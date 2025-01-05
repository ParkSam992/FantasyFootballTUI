import { getSelectInput } from "../../../prompts/getSelectInput";
import { Player } from "../../../types/player";

export async function GetPlayerRankingsFilterPrompt(rankings: Player[]) {
  const filterType = await getSelectInput(
    "Which player type are you interested in?",
    playerFilter
  );

  return rankings.filter((p) => p.position === filterType);
}

const playerFilter = [
  {
    label: "Quarterback",
    value: "QB",
  },
  {
    label: "Running Back",
    value: "RB",
  },
  {
    label: "Wide Reciever",
    value: "WR",
  },
  {
    label: "Tight End",
    value: "TE",
  },
];
