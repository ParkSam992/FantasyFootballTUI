import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";

export async function refreshPlayerData(): Promise<boolean> {
  const route = "/refreshPlayerData";
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.post(url, {}, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
