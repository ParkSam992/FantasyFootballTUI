import { getSelectInput } from "../../prompts/getSelectInput";
import { PlayerSearchPrompt } from "../../prompts/playerSearchPrompt";
import {
  tradeCalculatorType,
  addTeamPrompt,
  teamSelectionPrompt,
  teamPlayerPrompt,
} from "./tradeCalculatorPrompts";
import { buildTradeTable } from "./buildTradeTable";
import { getPlayerTradeValue } from "../../fantasyFootballApi/getPlayerTradeValue";
import { TradePlayer } from "../../types/tradePlayer";

export async function TradeCalculator() {
  console.log("Opening Trade Calculator");

  const leagueType = await getSelectInput(
    "What League Type",
    tradeCalculatorType
  );

  const tradeData = await getPlayerTradeValue();

  let teams: Record<string, TradePlayer[]> = {
    "Team 1": [],
  };

  let selection = "BEGIN";
  while (selection != "DONE") {
    const table = buildTradeTable(teams, leagueType);
    console.log(table.toString());

    selection = await getSelectInput(
      "What would you like to do?",
      addTeamPrompt
    );

    switch (selection) {
      case "ADD_TEAM":
        teams[`Team ${Object.keys(teams).length + 1}`] = [];
        break;
      case "REMOVE_TEAM":
        const teamToRemove = await getSelectInput(
          "Which team will you remove?",
          teamSelectionPrompt(Object.keys(teams))
        );
        delete teams[teamToRemove];
        break;
      case "ADD_PLAYER":
        const selectedTeam = await getSelectInput(
          "Which team will you add player too?",
          teamSelectionPrompt(Object.keys(teams))
        );
        const newPlayer = await PlayerSearchPrompt("Which player?");
        const playerData = tradeData.find((td) => td.sleeperId === newPlayer);
        playerData && teams[selectedTeam]?.push(playerData);
        break;
      case "REMOVE_PLAYER":
        const team = await getSelectInput(
          "Which team will you remove player from?",
          teamSelectionPrompt(Object.keys(teams))
        );
        const playerToRemove = await getSelectInput(
          "Which Player?",
          teamPlayerPrompt(teams[team])
        );
        teams[team] = teams[team].filter((p) => p.sleeperId !== playerToRemove);
        break;
      case "DONE":
        break;
    }
  }
}
