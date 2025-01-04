import chalk from "chalk";
import { getConfirmInput } from "./prompts/getConfirmInput";
import { getSelectInput } from "./prompts/getSelectInput";
import { firstQuestion } from "./promptConstants";

console.log(chalk.blue("Welcome"));

let direction = "BEGIN";

while (direction != "EXIT") {
  direction = await getSelectInput("What would you like to do?", firstQuestion);

  if (direction === "EXIT") {
    const exitBool = await getConfirmInput("Are you sure you want to exit?");
    if (!exitBool) {
      direction = "NO_EXIT";
    }
  }

  switch (direction) {
    case "BEGIN_DRAFT":
      console.log("Beginning Draft");
      break;
    case "TRADE_CALCULATOR":
      console.log("Opening Player Calculator");
      break;
    case "UTILITIES":
      console.log("Displaying Utilities Functions");
      break;
    case "REFRESH_PLAYER_RANKINGS":
      console.log("Refreshing Player Rankings");
      break;
    case "EXIT":
      console.log("Goodbye");
  }
}
