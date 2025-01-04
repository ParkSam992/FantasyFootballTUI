const { confirm } = require("@clack/prompts");

export async function getConfirmInput(message: string) {
  return await confirm({ message });
}
