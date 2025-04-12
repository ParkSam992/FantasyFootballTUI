import { MultiSelectChoice } from "../../prompts/getMultiSelectChoices";
import { TradePlayer } from "../../types/tradePlayer";

export const tradeCalculatorType = [
  {
    label: "Single QB Trade Calculator",
    value: "ONE_QB",
  },
  {
    label: "Superflex Trade Calculator",
    value: "SF",
  },
  {
    label: "Back",
    value: "BACK",
  },
];

export const teamSelectionPrompt = (teams: string[]): MultiSelectChoice[] => {
  let selection: MultiSelectChoice[] = [];
  teams.forEach((t) => selection.push({ label: t, value: t }));
  return selection;
};

export const teamPlayerPrompt = (
  players: TradePlayer[]
): MultiSelectChoice[] => {
  let selection: MultiSelectChoice[] = [];
  players.forEach((p) =>
    selection.push({
      label: p.firstName + " " + p.lastName,
      value: p.sleeperId,
    })
  );
  return selection;
};

export const addTeamPrompt = [
  {
    label: "Add Team",
    value: "ADD_TEAM",
  },
  {
    label: "Remove Team",
    value: "REMOVE_TEAM",
  },
  {
    label: "Add Player",
    value: "ADD_PLAYER",
  },
  {
    label: "Remove Player",
    value: "REMOVE_PLAYER",
  },
  {
    label: "Done",
    value: "DONE",
  },
];
