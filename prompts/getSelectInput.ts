const { select } = require("@clack/prompts");
import { MultiSelectChoice } from "./getMultiSelectChoices";

export async function getSelectInput(
  message: string,
  options: MultiSelectChoice[]
) {
  return await select({
    message: `${message}`,
    options,
  });
}
