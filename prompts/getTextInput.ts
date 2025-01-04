const { text } = require("@clack/prompts");

export async function getTextInput(message: string, placeHolder = "") {
  return await text({ message, placeholder: placeHolder });
}
