import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { TradePlayer } from "../types/tradePlayer";

export async function getPlayerTradeValue(): Promise<TradePlayer[]> {
  const route = `/getPlayerTradeValue`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error fetching player trade data: ", err.message);
    throw err;
  }
}
