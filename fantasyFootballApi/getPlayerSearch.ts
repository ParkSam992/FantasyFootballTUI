import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { MultiSelectChoice } from "../prompts/getMultiSelectChoices";

export async function getPlayerSearch(
  name: string
): Promise<MultiSelectChoice[]> {
  const route = `/playerSearch?name=${name}`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error searching players: ", err.message);
    throw err;
  }
}
