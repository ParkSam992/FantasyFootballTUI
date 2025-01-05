import { getUserLeagues } from "../../fantasyFootballApi/getUserLeagues";
import { MultiSelectChoice } from "../../prompts/getMultiSelectChoices";
import { getSelectInput } from "../../prompts/getSelectInput";
import { getTextInput } from "../../prompts/getTextInput";
import { League } from "../../types/league";

export async function CollectLeagueInfo(): Promise<League> {
  var username = await getTextInput("Enter Sleeper Username");

  const leagues = await getUserLeagues(username, "nfl", "2024");

  const leagueId = await getSelectInput(
    "Which league are you interested in?",
    GetLeagueOptions(leagues)
  );

  const selectedLeague = leagues.find((option) => option.leagueId === leagueId);

  if (!selectedLeague) {
    return { leagueId: "Unknown League" } as League;
  }

  return selectedLeague;
}

const GetLeagueOptions = (leagues: League[]): MultiSelectChoice[] => {
  return leagues.map((l) => ({
    label: `${l.name} - ${l.season}`,
    value: l.leagueId,
  }));
};
