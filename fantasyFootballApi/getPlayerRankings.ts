import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { Player } from "../types/player";

export async function getplayerRankings(market: string): Promise<Player[]> {
  const route = `/getplayerRankings?market=${market}`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error fetching player rankings: ", err.message);
    throw err;
  }
}
