const { multiselect } = require("@clack/prompts");

export type MultiSelectChoice = {
  label: string;
  value: string;
};

export async function getMultiSelectChoices(
  message: string,
  options: MultiSelectChoice[]
) {
  return await multiselect({
    message: `${message} (space to select, enter to subit, select none to skip)`,
    options,
  });
}
